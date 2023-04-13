import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../materail'
import {ReportsRoutingModule} from './reports-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
/*import {SimpleNotificationsModule} from 'angular2-notifications';*/
import {AgmCoreModule} from '@agm/core';
import {NationalityWUComponent} from './nationalityWU/nationalityWU.component';
import { RelationWUComponent } from "./relationWU/relationWU.component";
import { MonthWUComponent } from "./monthWU/monthWU.component";
import { GenderWUComponent } from "./genderWU/genderWU.component";
import { ClaimsTypeWUComponent } from "./claimsTypeWU/claimsTypeWU.component";
import {ReportsComponent} from './reports.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ChartModule,
    /*SimpleNotificationsModule.forRoot(),*/
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    HighchartsChartModule,
    MaterialModule
  ],
  declarations: [
    ReportsComponent,
    NationalityWUComponent,
    RelationWUComponent,
    MonthWUComponent,
    GenderWUComponent,
    ClaimsTypeWUComponent
  ],
 
  bootstrap: [ReportsComponent]
})
export class ReportsModule { }
