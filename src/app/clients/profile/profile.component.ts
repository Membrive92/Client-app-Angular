import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from './modal.service';
// tslint:disable-next-line:import-spacing
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-client',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() client: Client;
  title = 'Perfil del cliente';
  imageSelected: File;
   progress = 0;
  constructor(private clientService: ClientService,
              public modalService: ModalService) { }

  ngOnInit(): void {

  }
  selectImage(event) {
    this.imageSelected = event.target.files[0];
    this.progress = 0;
    console.log(this.imageSelected);
    if (this.imageSelected.type.indexOf('image') < 0) {
      swal.fire('Error en el archivo: ', 'Debe seleccionar una foto' , 'error');
      this.imageSelected = null;
    }
  }
  uploadImage() {
    if (!this.imageSelected) {
      swal.fire('Error en Subida: ', 'Debe seleccionar una foto' , 'error');
    } else {
    this.clientService.uploadImage(this.imageSelected, this.client.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          const response: any = event.body;
          console.log( 'respuesta:  ' + response);
          this.client = response.client as Client;
          console.log( 'this.cliente:  ' + this.client);
          console.log( 'response.cliente:  ' + response.client);
          swal.fire('la foto se ha subido correctamente', response.message  , 'success');
        }
      });
  }}
  closeModal(){
    this.modalService.closeModal();
    this.imageSelected = null;
    this.progress = 0;
  }
}
