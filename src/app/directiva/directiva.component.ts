import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {

  listaCurso: string[] = ['Typescript','javascript','Java','PHP'];

  habilitar: boolean = true;

  constructor() { }



}
