import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../materail'
import {ChartbotRoutingModule} from './chartbot-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {ChartbotComponent} from './chartbot.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    ChartbotRoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ChartbotComponent
  ],
 
  bootstrap: [ChartbotComponent]
})
export class ChartbotModule { }
