import { Injectable, NgZone } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root'
})


export class RecorderService {

  constructor( private http: HttpClient) { }
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  public abc: any;
  public res: any;

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }


  startRecording() {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }


    this._recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this._recordingFailed.next();
    });

  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });
    console.log(this.stream);

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          console.log("Blob isss:",blob);
          this._recorded.next({ blob: blob, title: mp3Name });
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = ()=>{
            let server = '/speech';
            const ParseHeaders = {
              headers: new HttpHeaders({
               'Content-Type'  : 'application/x-www-form-urlencoded;charset=base64'
              })
             };
            console.log("Reader is first:",reader);
            let d = reader['__zone_symbol__originalInstance'];
            let params = new HttpParams().set("msg",d.result);
            // var message = {'msg' : this.abc};
            this.http.post('https://192.168.1.131:8080/speech', params , ParseHeaders).subscribe(data =>{
            // this.http.post(server, params, ParseHeaders).subscribe(data =>{
                console.log(data);
                this.abc = data;
                // console.log("In record component, global value: ",GlobalServiceService.AudioData);
            });
            // console.log("reader's data iss:aaa",this.abc);          
          }
        }
      }, () => {
        this.stopMedia();
        this._recordingFailed.next();
      });
    }

  }

  private stopMedia() {
    console.log(this.recorder);
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }


}
