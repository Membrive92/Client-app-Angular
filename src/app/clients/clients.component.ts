import { Component, OnInit } from '@angular/core';
import {ClientService} from './client.service';
import {Client} from './client';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

   clients: Client[];
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    // subscribe method is for observable
     this.clientService.getClients().pipe(
      tap(clients => {
        console.log('clientComponent: tap 3');
        clients.forEach(client => {
          console.log(client.name);
        });
      })
     ).subscribe(
       // anonymous function abbreviation (it is correct if function only have one parameter)
       clients => this.clients = clients
     );
  }
  delete(client: Client): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `you want to delete client ${client.name} ${client.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clientService.delete(client.id).subscribe(

        response => {
          this.clients = this.clients.filter(cli => cli  !== client);
          swalWithBootstrapButtons.fire(
          'Client removed!',
          `Client ${client.name} removed successfully.`,
          'success'
        ); }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your client has been not removed',
          'error'
        );
      }
    });
  }

}
