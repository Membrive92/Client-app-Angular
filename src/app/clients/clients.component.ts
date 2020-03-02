import { Component, OnInit } from '@angular/core';
import {ClientService} from './client.service';
import {Client} from './client';


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
     this.clientService.getClients().subscribe(
       // anonymous function abbreviation (it is correct if function only have one parameter)
       clients => this.clients = clients
     );
  }

}
