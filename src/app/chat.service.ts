import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './Message';
import { Rooms } from './Rooms';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpclient: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/';
  url: string = this.baseUrl + 'message';
  urls: string = this.baseUrl + 'rooms';

  getMessage(): Observable<Message[]> {
    return this.httpclient.get<Message[]>(this.url);
  }

  addRoom(room: Rooms): Observable<any> {
    const body = JSON.stringify(room);
    return this.httpclient.post<any>(this.urls, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getRooms(): Observable<Rooms[]> {
    return this.httpclient.get<Rooms[]>(this.urls);
  }

  sendMessage(message: Message): Observable<any> {
    const body = JSON.stringify(message);
    return this.httpclient.post<Message>(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
