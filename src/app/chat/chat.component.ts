import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
  currentRoomId: string = '';
  roomValue: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRooms().subscribe((data: Rooms[]) => {
      this.rooms = data.map(
        (d: any) => new Rooms(d.roomName, d.id, d.messages)
      );
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
      this.addRoomForm.value.roomName = '';
    });
  }

  roomClick(id: string) {
    this.currentRoomId = id;
    this.chatService.getRoom(id).subscribe((response: Rooms) => {
      const msg = response.messages ?? [];
      this.roomValue = response.roomName;
      this.messages = msg.map(
        (d: any) => new Message(d.username, d.content, d.userId, d.id)
      );
    });
  }

  saveMessage() {
    const user = localStorage.getItem('user') ?? '';
    const parsedUser = JSON.parse(user);
    const username = parsedUser.username;
    const userId = parsedUser.id;

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
    console.log(message);

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
}
