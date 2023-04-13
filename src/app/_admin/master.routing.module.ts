import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master',
      status: false
    },
    children: [
      {
        path: 'user',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'role',
        loadChildren: './roles/roles.module#RolesModule'
      },

      {
        path: 'permission',
        loadChildren: './permission/permission.module#PermissionModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
