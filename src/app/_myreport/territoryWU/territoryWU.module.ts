import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import {TerritoryWURoutingModule} from './territoryWU.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {TerritoryWUComponent} from './territoryWU.component';
import { HighchartsChartModule } from 'highcharts-angular';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    TerritoryWURoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    TerritoryWUComponent
  ],
 
  bootstrap: [TerritoryWUComponent]
})
export class TerritoryWUModule { }
