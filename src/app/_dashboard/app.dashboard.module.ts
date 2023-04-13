import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../materail'
import {AppDashboardRoutingModule} from './app.dashboard-routing.module';
import {SharedModule} from './../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {AppDashboardComponent} from './app.dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    AppDashboardRoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    AppDashboardComponent
  ],
 
  bootstrap: [AppDashboardComponent]
})
export class AppDashboardModule { }
