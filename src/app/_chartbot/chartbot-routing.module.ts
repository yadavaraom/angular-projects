import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartbotComponent} from './chartbot.component';

const routes: Routes = [
  {
    path: '',
    component: ChartbotComponent,
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
export class ChartbotRoutingModule { }
