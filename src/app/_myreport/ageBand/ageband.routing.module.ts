import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AgebandComponent } from "./ageband.component";
const routes: Routes = [
  {
    path: '',
    component: AgebandComponent,
    data: {
      title: 'Dashboard',
      icon: 'icon-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgebandRoutingModule { }
