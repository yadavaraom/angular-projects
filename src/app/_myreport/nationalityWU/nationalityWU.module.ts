import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import {NationalityWURoutingModule} from './nationalityWU.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import { NationalityWUComponent } from "./nationalityWU.component";
import { HighchartsChartModule } from 'highcharts-angular';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    NationalityWURoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    NationalityWUComponent
  ],
 
  bootstrap: [NationalityWUComponent]
})
export class NationalityWUModule { }
