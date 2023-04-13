import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
      status: false
    },
    children: [
      {
        path: 'profile',
        loadChildren: './user-profile/user-profile.module#UserProfileModule'
      },
      {
        path: 'card',
        loadChildren: './user-card/user-card.module#UserCardModule'

      }
      // ,
      // {
      //   path: 'admin',
      //   loadChildren: './user-admin/user-admin.module#AdminProfileModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
