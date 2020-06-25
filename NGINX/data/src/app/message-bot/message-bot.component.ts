import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-bot',
  templateUrl: './message-bot.component.html',
  styleUrls: ['./message-bot.component.css']
})
export class MessageBotComponent implements OnInit {
  @Input('') Botdata:any;

  constructor() { }
  
  botMessages = [];
  compvalue: string;
  fg: number;

  ngOnInit() {

    console.log(this.Botdata);
    if(this.Botdata != null)
     this.botMessages.push(this.Botdata);

     var searchWords = 'Sure';
          if(this.Botdata.indexOf(searchWords) == -1){
            console.log('Not Found!');
            this.fg = 0;
          }
          else{
            console.log('Found!');
            this.fg = 1;
          }
  }

}