import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnInit } from '@angular/core';
import { AddComponentDirective } from '../add-component.directive';
import { MessageUserComponent } from '../message-user/message-user.component';
import { MessageBotComponent } from '../message-bot/message-bot.component';
import { GlobalServiceService } from '../global-service.service';
import { DetailsComponent } from '../details/details.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css','../../../node_modules/font-awesome/css/font-awesome.css']
})
export class ChatBoxComponent implements OnInit {

  @ViewChild( AddComponentDirective, {static: true}) adHost: AddComponentDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 

  }
  userMesseges = {};
  botMessages = {};
  
  ngOnInit() {

    GlobalServiceService.adhost = this.adHost; 

  }
  
  loadComponent(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageUserComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.userMesseges["message"] = message;
    (<any>componentRef.instance).data = this.userMesseges["message"];
  }

  LoadBotMessage(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBotComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.botMessages["message"] = message;
    (<any>componentRef.instance).Botdata = this.botMessages["message"];
  }

  LoadDetailsComponent(message){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DetailsComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    (<any>componentRef.instance).details = message;
  }
  ContactComponent(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContactComponent);

    const viewContainerRef = GlobalServiceService.adhost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
