import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form.component';


const routes: Routes = [{
  path: '',
  component: ClientFormComponent,
  data: {
    title: 'Client Form'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFormRoutingModule { }
