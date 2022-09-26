import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/Message';
import { Rooms } from '../models/Rooms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  addRoomForm = new FormGroup({
    roomName: new FormControl('', [Validators.required]),
  });
  messages: any;
  rooms: any;
  username: any;
  content: string = '';
  currentRoomId: string = '';
  roomValue: any;
  editable = false;
  stompClient!: any;
  imageSelected!: any;
  files: any[] = [];
  cancelEditMsg: boolean = false;
  saveEditMsg: boolean = true;

  constructor(
    private chatService: ChatService,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.chatService.getRooms().subscribe((data: Rooms[]) => {
      this.rooms = data.map(
        (d: any) => new Rooms(d.roomName, d.id, d.messages)
      );
    });
    this.connect();
  }

  onInputChange(msg: Message, val: any) {
    // msg.newValue = val.currentTarget.value;
    const index = this.messages.findIndex((m: Message) => {
      if (m.id === msg.id) {
        return true;
      }

      return false;
    });
    this.messages[index].newValue = val.currentTarget.value;
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/chatapp');
    this.stompClient = Stomp.over(socket);
    const token = localStorage.getItem('access_token') ?? '';

    this.stompClient.connect({ 'X-Authorization': token }, () => {
      this.stompClient.subscribe('/topic/public', (messageSent: any) => {
        const data = JSON.parse(messageSent.body);
        if (data.currentRoomId === this.currentRoomId) {
          const newMessage = new Message(
            data.username,
            data.content,
            data.userId,
            data.currentRoomId,
            data.type,
            data.id
          );
          this.addMessage(newMessage);
        }
      });
    });
  }

  addMessage(message: Message) {
    //Kontrolloj nese ekziston mesazhi
    const index = this.messages.findIndex((m: Message) => {
      if (m.id === message.id) {
        return true;
      }

      return false;
    });
    if (index == -1) {
      this.messages.push(message);
    } else {
      this.messages[index] = message;
    }
  }

  sendMessage() {
    const userId = localStorage.getItem('uId') ?? '';
    const username = this.authService.getUsername();

    if (!this.content) {
      alert('Please fill the content');
      return;
    }
    const type = this.imageSelected ? 'image' : 'message';
    const messageContent = this.imageSelected ?? this.content;

    const message = new Message(
      username,
      messageContent,
      userId,
      this.currentRoomId,
      type
    );

    const token = localStorage.getItem('access_token') ?? '';
    this.stompClient.send(
      '/app/chat.sendMessage',
      { 'X-Authorization': token },
      JSON.stringify(message)
    );
    this.content = '';
    this.imageSelected = null;
  }

  saveRoom() {
    let roomName = this.addRoomForm.value.roomName;
    if (!roomName) {
      alert('Please fill the room name');
      return;
    }
    const rooms = new Rooms(roomName);

    this.chatService.addRoom(rooms).subscribe((response: any) => {
      this.rooms.push(response);
      this.addRoomForm.reset();
    });
  }

  roomClick(id: string) {
    this.currentRoomId = id;
    this.chatService.getRoom(id).subscribe((response: Rooms) => {
      const msg = response.messages ?? [];
      this.roomValue = response.roomName;
      this.messages = msg.map(
        (d: any) =>
          new Message(
            d.username,
            d.content,
            d.userId,
            d.currentRoomId,
            d.type,
            d.id
          )
      );
    });
    this.scrollOnBottom();
  }

  scrollOnBottom(): void {
    setTimeout(() => {
      const element = document.getElementById('chat-container-id');
      // console.log(element);

      if (element) {
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
      }
    }, 200);
  }

  saveMessage() {
    const userId = localStorage.getItem('uId') ?? '';
    const username = '';

    if (!this.content) {
      alert('Please fill the content');
      return;
    }
    const message = new Message(
      username,
      this.content,
      userId,
      this.currentRoomId
    );
    // console.log(message);

    this.chatService.sendMessage(message).subscribe((data: any) => {
      const newMessage = new Message(
        data.username,
        data.content,
        data.userId,
        data.currentRoomId,
        data.id
      );
      this.content = '';
      this.messages.push(newMessage);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    //convert file to base64 string
    //kete string e ruaj tek imageSelected
    reader.onload = () => {
      this.content = file.name;
      this.imageSelected = reader.result;
    };
  }

  cancelEdit() {}

  saveEdit(message: Message) {
    // console.log(message);

    if (message.newValue == null) {
      return;
    }
    message.content = message.newValue;
    this.stompClient.send('/app/chat.editMessage', {}, JSON.stringify(message));
  }
}
