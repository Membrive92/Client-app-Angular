import { Injectable } from '@angular/core';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';
import localeEN from '@angular/common/locales/en';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, of, throwError, from} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
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
      tap(response => {
        console.log('tap1');
        const clients = response as Client[];
        clients.forEach( client => {
          console.log(client.name);

     });

     }),
      map( response => {

        const clients = response as Client[];
        return clients.map(client => {
          // I change the first character of name and last name to capital letter
            client.name = client.name[0].toUpperCase() + client.name.substr(1).toLowerCase();
            client.lastName = client.lastName[0].toUpperCase() + client.lastName.substr(1).toLowerCase();
            const datePipe = new DatePipe('en');
           // client.createAt = datePipe.transform(client.createAt, 'EEEE dd, MMMM yyyy');
           // client.createAt = formatDate(client.createAt, 'dd-MM-yyyy', 'en-US');
            return client;
          });


          }),
          tap(response => {
            console.log('tap2');
            response.forEach( client => {
              console.log(client.name);

         });

         }),
    );
    // return of(CLIENTS);
  }
  create(client: Client): Observable<any> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {

       if (e.status === 400) {
         return throwError(e);
       }
       console.error(e.error.message);
       swal.fire('Operation failed', e.error.message, 'error' );
       return throwError(e);
      })
    );
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire('Operation failed', e.error.message, 'error' );
        return throwError(e);
      })
    );
  }

  update(client: Client): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders} ).pipe(
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
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
