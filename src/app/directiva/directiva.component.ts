import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {

  buttonText: string = "Mostrar";
  courseList: string[] = ['Typescript','javascript','Java','PHP'];

  enable: boolean = true;

   changeText(){
     this.buttonText = (this.enable)  ? "Show" : "Hide";
     this.enable = !this.enable
   }
  constructor() { }



}
