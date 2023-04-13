import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GenderWUComponent } from "./genderWU/genderWU.component";
const routes: Routes = [
  {
    path: '',
    //component: MyReportComponent,
    data: {
      title: 'Report',
      status: false
    }
    ,
    children: [
      {
        path: 'Age_Band_Wise_Utilization',
        loadChildren: './ageBand/ageband.module#AgebandModule'
      }
      ,{
        path: 'Benefit_Wise_Utilization',
        loadChildren: './benefitWU/benefitWU.module#BenefitWUModule'
      },
      {
        path: 'Gender_Wise_Breakdown_Utilization',
        loadChildren: './genderWU/genderWU.module#GenderWUModule'
      }
      ,{
        path: 'Nationality_Wise_Utilization',
        loadChildren: './nationalityWU/nationalityWU.module#NationalityWUModule'
      }
      ,{
        path: 'Relation_Wise_Utilization',
        loadChildren: './relationWU/relationWU.module#RelationWUModule'
      }
      ,{
        path: 'Network_Wise_Utilization',
        loadChildren: './networkWU/networkWU.module#NetworkWUModule'
      }
      ,{
        path: 'Territory_Wise_Utilization',
        loadChildren: './territoryWU/territoryWU.module#TerritoryWUModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyReportRoutingModule { }
