import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageUserComponent } from './message-user/message-user.component';
import { MessageBotComponent } from './message-bot/message-bot.component';
import { AddComponentDirective } from './add-component.directive';
import { HttpClientModule } from  '@angular/common/http';
import {RecorderService} from './recorder.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {  SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { BHKComponent } from './bhk/bhk.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatBoxComponent,
    MessageBoxComponent,
    MessageUserComponent,
    MessageBotComponent,
    AddComponentDirective,
    BHKComponent,
    DetailsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 2.0,
      pitch: 1.0,
      rate: 1.0,
    }),
  ],
  providers: [RecorderService],
  bootstrap: [AppComponent],
  entryComponents:[BHKComponent, MessageBotComponent, MessageUserComponent, DetailsComponent,ContactComponent]
})
export class AppModule { }
