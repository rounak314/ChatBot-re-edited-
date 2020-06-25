import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css','../../../node_modules/font-awesome/css/font-awesome.css']
})
export class DetailsComponent implements OnInit {

@Input('') details:any;
fg: number;

constructor() { }


  ngOnInit() {
    // var fg = 0;
    var word1 = 'sqft';
    if(this.details.indexOf(word1) > -1){
      console.log("sqft found");
      this.fg = 1
    }
    var word2 = 'Rs.';
    if(this.details.indexOf(word2) > -1){
      console.log("Rs found");
      this.fg = 2
    }
  }

}
