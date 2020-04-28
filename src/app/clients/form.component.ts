import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { AppComponent } from '../app.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
 console.log('clicked');
 console.log(this.client);
  }
}
