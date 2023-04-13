import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { NationalityWUComponent } from './nationalityWU/nationalityWU.component';
import { RelationWUComponent } from "./relationWU/relationWU.component";
import { MonthWUComponent } from "./monthWU/monthWU.component";
import { GenderWUComponent } from "./genderWU/genderWU.component";
import { ClaimsTypeWUComponent } from "./claimsTypeWU/claimsTypeWU.component";

const routes: Routes = [
  {
    path: '',
    //component: ReportsComponent,
    data: {
      title: 'Reports',
      icon: 'icon-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: true
    },

    //Month Wise Utilization
    children: [
      {
        path: 'Age_Band_Wise_Utilization',
        component: ReportsComponent,
        data: {
          title: 'Age Band Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
      },
      {
        path: 'Nationality_Wise_Utilization',
        component: NationalityWUComponent,
        data: {
          title: 'Nationality Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
      }
      , {
        path: 'Relation_Wise_Utilization',
        component: RelationWUComponent,
        data: {
          title: 'Relation Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
      }
      //Month_Wise_Breakdown_Utilization
      
      , {
        path: 'Month_Wise_Breakdown_Utilization',
        component: MonthWUComponent,
        data: {
          title: 'Month Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
       },
       {
        path: 'Gender_Wise_Breakdown_Utilization',
        component: GenderWUComponent,
        data: {
          title: 'Gender Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
      }
      , {
        path: 'Claims_Type_Utilization',
        component: ClaimsTypeWUComponent,
        data: {
          title: 'Claims Type Wise Utilization',
          icon: 'icon-home',
          caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
          status: true
        }
      }
      //, {//ClaimMonth
      //   path: 'Nationality_Wise_Utilization',
      //   component: NationalityWUComponent,
      //   data: {
      //     title: 'Nationality Wise Utilization',
      //     icon: 'icon-home',
      //     caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      //     status: true
      //   }
      // }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
