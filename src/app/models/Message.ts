export class Message {
  userId!: string;
  id!: string;
  username!: string;
  content!: string;
  currentRoomId!: string;
  type!: string; //message-image
  newValue!: string;

  constructor(
    username?: string,
    content?: string,
    userId?: string,
    currentRoomId?: string,
    type?: string,
    id?: string
  ) {
    if (currentRoomId) this.currentRoomId = currentRoomId;
    if (userId) this.userId = userId;
    if (id) this.id = id;
    if (type) this.type = type;
    if (username) this.username = username;
    if (content) this.content = content;
  }

  isMessageMine() {
    const userId = localStorage.getItem('uId') ?? '';
    return userId == this.userId;
  }

  isImage() {
    return this.type == 'image';
  }
}
