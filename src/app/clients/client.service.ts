import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private urlEndPoint = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {}




  // I can follow state of object 'Client' if this state change, 'watchers' know it

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Client[])
    );
    // return of(CLIENTS);
  }
  create(client: Client): Observable<any> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal.fire('Operation failed', e.error.message, 'error' );
        return throwError(e);
      })
    );
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire('Operation failed', e.error.message, 'error' );
        return throwError(e);
      })
    );
  }

  update(client: Client): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders} ).pipe(
      catchError(e => {
        console.error(e.error.message);
        swal.fire('Operation failed', e.error.message, 'error' );
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`,  {headers: this.httpHeaders} );
  }
}
