import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  BotElem = true;
  ImageElem = false;
  ngOnInit() {
  }
  DisplayElement(){
    this.BotElem = !this.BotElem;
    this.ImageElem = !this.ImageElem;
  }
  ClickElement(){
    this.BotElem = !this.BotElem;
    this.ImageElem = !this.ImageElem;
  }
}
