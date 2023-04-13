import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionComponent} from './permission.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: {
      title: 'Permission',
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
export class PermissionRoutingModule { }
