import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { Message } from '../Message';
import { Rooms } from '../Rooms';

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

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data: Message[]) => {
      this.messages = data.map(
        (d) => new Message(d.username, d.content, d.userId, d.id)
      );
    });

    this.chatService.getRooms().subscribe((data: Rooms[]) => {
      this.rooms = data;
    });
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
    });
  }

  saveMessage() {
    const user = localStorage.getItem('user') ?? '';
    const username = JSON.parse(user).username;
    const userid = localStorage.getItem('user') ?? '';
    const userId = JSON.parse(userid).id;
    if (!this.content) {
      alert('Please fill the content');
      return;
    }
    const message = new Message(username, this.content, userId);
    console.log(message);

    this.chatService.sendMessage(message).subscribe((data: any) => {
      this.messages.push(data);
    });
  }
}
