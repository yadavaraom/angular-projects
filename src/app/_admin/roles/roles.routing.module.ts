import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesComponent} from './roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: {
      title: 'Role',
      icon: 'ti-users',
      caption: 'loursem it to no crm to dshil aksl ek se.',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
