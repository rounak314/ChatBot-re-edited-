import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageUserComponent } from './message-user/message-user.component';
import { MessageBotComponent } from './message-bot/message-bot.component';



const routes: Routes = [
  {
    path: 'message-user',
    component: MessageUserComponent
  },
  {
    path : 'message-bot',
    component : MessageBotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
