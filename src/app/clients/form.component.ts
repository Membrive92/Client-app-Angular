import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { from } from 'rxjs';
import { ClientService } from './client.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public title = 'New Student';

  constructor(public clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
  this.clientService.create(this.client).subscribe(client => {
    response => this.router.navigate(['/clients'])
    swal.fire('New client ', `${client.name} added`, 'success');
  }
  );
  }
}
