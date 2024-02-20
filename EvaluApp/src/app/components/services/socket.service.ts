import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { BehaviorSubject, Observable } from 'rxjs';
import { ISurvey } from './ISurvey';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message$: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  constructor() {}

  socket = io('http://localhost:3002');

  // Method to get new messages from the socket
  public getNewMessage(): Observable<string[]> {
    this.socket.on('survey', (survey: ISurvey) => {
      this.message$.next(['survey', JSON.stringify(survey)]);
    });

    return this.message$.asObservable();
  }

  // Method to close the socket connection
  public closeSocket() {
    this.socket.disconnect();
  }

  
}
