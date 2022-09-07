import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/Message';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css'],
})
export class ChatMsgComponent implements OnInit {
  @Input() message!: Message;
  @Output() onSave = new EventEmitter();
  editable = false;
  toggleButton: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onInputChange(event: any) {
    this.message.newValue = event.currentTarget.value;
  }

  editMessage(): void {
    this.editable = true;
    this.toggleButton = !this.toggleButton;
  }

  cancelEdit(): void {
    this.editable = false;
    this.toggleButton = true;
  }

  saveEdit(): void {
    this.toggleButton = true;
    this.onSave.emit(this.message);
    this.editable = false;
  }
}
