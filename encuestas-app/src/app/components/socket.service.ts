import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { BehaviorSubject, Observable } from 'rxjs';
import { IEncuesta } from './IEncuesta';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message$: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  constructor() {} 

  socket = io('http://localhost:3002');

  public getNewMessage = () => {
    this.socket.on('encuesta', (encuesta: IEncuesta) => {
      this.message$.next(['encuesta', JSON.stringify(encuesta)]);
    });

    return this.message$.asObservable();
  };

  public cerrarSocket() {
    this.socket.disconnect();
  }

  
}
