import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private urlEndPoint = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient) {}




  // I can follow state of object 'Client' if this state change, 'watchers' know it

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Client[])
    );
    // return of(CLIENTS);
  }
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders});

  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`);
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders} );
  }
}
