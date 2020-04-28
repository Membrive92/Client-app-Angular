import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private urlEndPoint = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}




  // I can follow state of object 'Client' if this state change, 'watchers' know it

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Client[])
    );
    // return of(CLIENTS);
  }
}
