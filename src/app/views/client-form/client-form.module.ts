import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFormRoutingModule } from './client-form-routing.module';
import { ClientFormComponent } from './client-form.component';


@NgModule({
  declarations: [
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientFormRoutingModule
  ]
})
export class ClientFormInitModule { }
