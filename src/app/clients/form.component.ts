import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { from } from 'rxjs';
import { ClientService } from './client.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public title = 'New Student';
  public errors: string [];


  constructor(public clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadClient();
  }
  loadClient(): void {
   this.activatedRoute.params.subscribe(params => {
     const id = params.id;
     if (id) {
        this.clientService.getClient(id).subscribe((client) => this.client = client);
      }
   });
  }

  public create(): void {
  this.clientService.create(this.client).subscribe(json => {
     this.router.navigate(['/clients']);
     swal.fire('New client ', `${json.client.name} added`, 'success');
  },
  err => {this.errors = err.error.errors as string[];
          console.error('Error code from backend ' + err.error.errors);
          console.error(err.error.errors); }
  );
  }
  update(): void {
    this.clientService.update(this.client).subscribe( json => {
      this.router.navigate(['/clients']);
      swal.fire('Client update ', `${json.client.name} has been updated successfully`, 'success');
    }, err => {this.errors = err.error.errors as string[];
               console.error('Error code from backend ' + err.error.errors);
               console.error(err.error.errors); } );
  }
}
