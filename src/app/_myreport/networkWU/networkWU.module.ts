import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import {NetworkWURoutingModule} from './networkWU.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {NetworkWUComponent} from './networkWU.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  imports: [
    CommonModule,
    NetworkWURoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    NetworkWUComponent
  ],
 
  bootstrap: [NetworkWUComponent]
})
export class NetworkWUModule { }
