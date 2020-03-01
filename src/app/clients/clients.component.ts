import { Component, OnInit } from '@angular/core';
import {Client} from './client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

   clients: Client[] = [
     {id: 1, name: 'Jose', lastName:'Antonio', email:'test@mail.com',createAt:'2017-12-11'},
     {id: 1, name: 'Paco', lastName:'', email:'test1@mail.com',createAt:'2018-12-11'},
     {id: 1, name: 'Megan', lastName:'', email:'test2@mail.com',createAt:'2019-12-11'},
     {id: 1, name: 'Jaime', lastName:'', email:'test3@mail.com',createAt:'2020-12-11'},
     {id: 1, name: 'Paul', lastName:'', email:'test4@mail.com',createAt:'2016-12-11'}

   ];
  constructor() { }

  ngOnInit(): void {
  }

}
