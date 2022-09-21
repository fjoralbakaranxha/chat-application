export class Rooms {
  id!: string;
  roomName!: string;
  messages!: any;

  constructor(roomName?: string, id?: string, messages?: any) {
    if (id) this.id = id;
    if (roomName) this.roomName = roomName;
    this.messages = messages ?? [];
  }
}
