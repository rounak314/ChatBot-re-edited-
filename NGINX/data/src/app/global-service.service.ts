import { Injectable } from '@angular/core';
import { MessageBoxComponent } from './message-box/message-box.component';
// import { ChatBoxComponent } from './chat-box/chat-box.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  // test="testing";
  // static one;
  static adhost;
  static AudioData;
  static SessionID;
  messag : string;
  constructor(  ) { }
  // public MessageBox : MessageBoxComponent 
  // public chatbox: ChatBoxComponent
}
