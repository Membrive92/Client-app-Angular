import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor() { }
  // We can follow state of object 'Client' if this state change, 'watchers' know it
  getClients(): Observable<Client[]> { return of(CLIENTS);}
}
