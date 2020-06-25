import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnInit, Input } from '@angular/core';
import { AddComponentDirective } from '../add-component.directive';
import { GlobalServiceService } from '../global-service.service';
import { MessageUserComponent } from '../message-user/message-user.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageBotComponent } from '../message-bot/message-bot.component';

@Component({
  selector: 'app-bhk',
  templateUrl: './bhk.component.html',
  styleUrls: ['./bhk.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class BHKComponent implements OnInit {
@Input('') Botdata:any;

@ViewChild( AddComponentDirective, {static: true}) adHost: AddComponentDirective;

  constructor( private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) { }
//  
  botMessages = [];
  message: string;
  temp = true;

  ngOnInit() {
  }

  MessageSend(message){

    const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };

    this.loadComponent(message)

    let params = new HttpParams().set("msg",message).set("session",GlobalServiceService.SessionID);

    this.http.post('http://localhost:7314/app', params , ParseHeaders).subscribe(data =>{
      // this.http.post(server, message, ParseHeaders).subscribe(data => {
        console.log("Data isss:",data);
        (async () => {
          for(var i =0 ; data[i]!=null ; i++ ){
            this.LoadBotMessage(data[i]);
            await this.delay(3000);
          }
        })();
      })
  }
  
  Click1BHK(){
    this.MessageSend('1BHK');
    this.temp = false;
  }

  Click2BHK(){
    this.MessageSend('2BHK');
    this.temp = false;

  }

  Click3BHK(){
    this.MessageSend('3BHK');    
    this.temp = false;

  }

  delay(ms: number){
    return new Promise(resolve=> setTimeout(resolve, ms));
  }

  loadComponent(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageUserComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).data = message;
  }

  LoadBotMessage(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBotComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).Botdata = message;
  }
}
