import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnInit, Input } from '@angular/core';
import { AddComponentDirective } from '../add-component.directive';
import {GlobalServiceService} from '../global-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageBotComponent } from '../message-bot/message-bot.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

@ViewChild( AddComponentDirective, {static: true}) adHost: AddComponentDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) { }

  buttonElem = false;
  contactElem = true;
  email: string;
  phone: string;
  disable = false;

  ngOnInit() {
  }
  DisplayForm(){
    this.buttonElem = !this.buttonElem;
    this.contactElem = !this.contactElem;
  }

  HideForm(){
    this.contactElem = !this.contactElem;
  }

  sendDetails(phone,email){
    console.log("Phone number is:",phone);
    console.log("EmailId is: ",email);

    const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };
     var server = '/contact';
    let params = new HttpParams().set("phone",phone).set("session",GlobalServiceService.SessionID).set("mail",email);
    // this.http.post('https://192.168.1.131:8080/contact', params , ParseHeaders).subscribe(data =>{
      this.http.post(server, params, ParseHeaders).subscribe(data => {
        console.log("Responseeee: ",data);
        (async () => {
          await this.delay(2000);
            this.LoadBotMessage(data);
        })();
    });
    this.email = '';
    this.phone = '';
    this.disable = !this.disable;
    this.HideForm();
  }

  delay(ms: number){
    return new Promise(resolve=> setTimeout(resolve, ms));
  }

  LoadBotMessage(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBotComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).Botdata = message;
  }


}
