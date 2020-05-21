import { Component, OnInit } from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import {ActivatedRoute} from '@angular/router';
// tslint:disable-next-line:import-spacing
import swal from  'sweetalert2';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-client',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  client: Client;
  title = 'Perfil del cliente';
  private imageSelected: File;
  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.clientService.getClient(id).subscribe(client => {
            this.client = client;
        });
      }
      });
  }
  selectImage($event) {
    this.imageSelected = $event.target.files[0];
    console.log(this.imageSelected);
  }
  uploadImage() {
    this.clientService.uploadImage(this.imageSelected, this.client.id)
      .subscribe(client => {
        this.client = client;
        swal.fire('la foto se ha subido correctamente', 'la foto se ha subido con éxito: ' + `${this.imageSelected.name}`, 'success');
      });
  }
}
