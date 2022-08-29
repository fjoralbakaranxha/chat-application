export class Rooms {
  id!: string;
  roomName!: string;

  constructor(roomName?: string, id?: string) {
    if (id) this.id = id;
    if (roomName) this.roomName = roomName;
  }
}
