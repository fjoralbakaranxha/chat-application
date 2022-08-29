export class Message {
  userId!: string;
  id!: string;
  username!: string;
  content!: string;

  constructor(
    username?: string,
    content?: string,
    userId?: string,
    id?: string
  ) {
    if (userId) this.userId = userId;
    if (id) this.id = id;
    if (username) this.username = username;
    if (content) this.content = content;
  }

  isMessageMine() {
    const user = localStorage.getItem('user') ?? '';
    const userId = JSON.parse(user).id;

    return userId == this.userId;
  }
}
