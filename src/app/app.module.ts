import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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


const routes: Routes = [
{path: '', redirectTo: '/clients', pathMatch: 'full'},
{path: 'directives', component: DirectivaComponent},
{path: 'clients', component: ClientsComponent},
{path: 'clients/form', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OverlayModule,
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


