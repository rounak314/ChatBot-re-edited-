import { Component, OnInit, Input } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-message-user',
  templateUrl: './message-user.component.html',
  styleUrls: ['./message-user.component.css']
})
export class MessageUserComponent implements OnInit {
  @Input('') data:any;

  userMessages = [];
  constructor(public glovar: GlobalServiceService) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data != null)
      this.userMessages.push(this.data);
  }
}
