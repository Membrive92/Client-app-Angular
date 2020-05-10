import { Component, OnInit } from '@angular/core';
import {ClientService} from './client.service';
import {Client} from './client';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

   clients: Client[];
   paginator: any;
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit()  {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clientService.getClients(page).pipe(
        tap(response => {
        console.log('clientComponent: tap 3');
        (response.content as Client[]).forEach(client => console.log(client.name));
        })
     ).subscribe(response => {this.clients = response.content as Client[];
                              this.paginator = response;
    });
     }
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
