import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeES from '@angular/common/locales/es';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivaComponent } from './directiva/directiva.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ClientsComponent } from './clients/clients.component';
import {RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import {FormsModule} from '@angular/forms';
import { ClientService } from './clients/client.service';
import { PaginatorComponent } from './paginator/paginator.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MomentUtcDateAdapter } from './clients/MomentUtcDateAdapter';
import { ProfileComponent } from './clients/profile/profile.component';
registerLocaleData(localeES, 'es');

const routes: Routes = [
{path: '', redirectTo: '/clients', pathMatch: 'full'},
{path: 'directives', component: DirectivaComponent},
{path: 'clients', component: ClientsComponent},
{path: 'clients/page/:page', component: ClientsComponent},
{path: 'clients/form', component: FormComponent},
{path: 'clients/form/:id', component: FormComponent},
  {path: 'clients/view/:id', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OverlayModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatDatepickerModule,
    MatMomentDateModule

  ],
  providers: [ClientService, { provide: LOCALE_ID, useValue: 'es' },
  { provide: MAT_DATE_LOCALE, useValue: 'es' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: DateAdapter, useClass: MomentUtcDateAdapter } ],

  bootstrap: [AppComponent]
})
export class AppModule { }


