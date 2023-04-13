import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import {GenderWURoutingModule} from './genderWU.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {GenderWUComponent} from './genderWU.component';
import { HighchartsChartModule } from 'highcharts-angular';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    GenderWURoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    GenderWUComponent
  ],
 
  bootstrap: [GenderWUComponent]
})
export class GenderWUModule { }
