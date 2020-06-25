import { Component, OnInit } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {RecorderService} from '../recorder.service'
import { GlobalServiceService } from '../global-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
// import { BHKComponent } from '../bhk/bhk.component';
// import { Http, Headers, Response, URLSearchParams } from '@angular/common/http';
// import { __awaiter } from 'tslib';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css','../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [ChatBoxComponent]
})

export class MessageBoxComponent implements OnInit {

  isRecording = false;
  recordedTime;
  blobUrl;
  blobResult;
  sessionID: any;


  msg : any;
  constructor(private chatbox: ChatBoxComponent, private http: HttpClient,private audioRecordingService: RecorderService, private sanitizer: DomSanitizer, public f: SpeechSynthesisUtteranceFactoryService, public svc: SpeechSynthesisService,) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
   }
  
  InputMsg: string;
  
  delay(ms: number){
    return new Promise(resolve=> setTimeout(resolve, ms));
  }
  
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }
  
  clearRecordedData() {
    this.blobUrl = null;
    console.log("Recorded data iss(in message-box):",this.audioRecordingService.abc);
    this.VoiceMessageSent(this.audioRecordingService.abc);
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  speech(contents) {
      const v = this.f.text(contents);
      this.svc.speak(this.f.text(contents));
  }

  SessionIdGenerator(){

      const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const s = Array.from({length:30}, _ => c[Math.floor(Math.random()*c.length)]).join('');
      return s;
  }

  ngOnInit() {
  }


  MessageSend(message){
    let server = '/app';
    if(GlobalServiceService.SessionID == null)
      GlobalServiceService.SessionID = this.SessionIdGenerator();

    console.log(GlobalServiceService.SessionID);

    const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };
    if (message.trim().length != 0){
      let params = new HttpParams().set("msg",message).set("session",GlobalServiceService.SessionID);
      this.chatbox.loadComponent(message);
      this.http.post('http://localhost:7314/app', params , ParseHeaders).subscribe(data =>{
      // this.http.post(server, message, ParseHeaders).subscribe(data => {
        this.msg= data;
        console.log("Data isss:",data);
        (async () => {
          var word1 = 'sqft';
          var word2 = 'Rs.';
          if((data[0].indexOf(word1) > -1 || data[0].indexOf(word2) > -1)){
            console.log('Found the word')
            await this.delay(3000);
            this.chatbox.LoadDetailsComponent(data[0]);
            await this.delay(2000);
            this.chatbox.LoadBotMessage(data[1]);
            this.chatbox.ContactComponent();
          }
          else{
            for(var i =0 ; data[i]!=null ; i++ ){
              await this.delay(3000);
              this.chatbox.LoadBotMessage(data[i]);
              if(data[i].indexOf('Please') > -1)
                this.chatbox.ContactComponent();
            }
          }          
        })();
      });
    }
    else
       alert("Please enter your message");
     
    this.InputMsg = '';
  }

  VoiceMessageSent(message){

    if(GlobalServiceService.SessionID == null)
    GlobalServiceService.SessionID = this.SessionIdGenerator();

    console.log(this.sessionID);

      let params = new HttpParams().set("msg",message).set("session",GlobalServiceService.SessionID);
      this.chatbox.loadComponent(message);
    const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };
     var server = '/app';
    this.http.post('http://loaclhost:7314/app', params , ParseHeaders).subscribe(data =>{
      // this.http.post(server, params, ParseHeaders).subscribe(data => {
        this.msg= data;
        console.log("Data isss:",data);
        (async () => {
          for(var i =0 ; data[i]!=null ; i++ ){
            await this.delay(3000);
            this.chatbox.LoadBotMessage(data[i]);
          }
          this.speech(data);
        })();
      });
  }
}