import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../materail'
import {BenefitWURoutingModule} from './benefitWU.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {BenefitWUComponent} from './benefitWU.component';
import { HighchartsChartModule } from 'highcharts-angular';


declare var require: any;




@NgModule({
  imports: [
    CommonModule,
    BenefitWURoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    BenefitWUComponent
  ],
 
  bootstrap: [BenefitWUComponent]
})
export class BenefitWUModule { }
