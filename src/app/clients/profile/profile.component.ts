import { Component, OnInit } from '@angular/core';
import {Client} from '../client';
import {ClientService} from '../client.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-client',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  client: Client;
  title = 'Perfil del cliente';
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.clientService.getClient(id).subscribe(client => {
            this.client = client;
        });
      }
      }

    );
  }

}
