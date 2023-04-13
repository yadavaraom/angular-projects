import {AfterViewInit, Component, OnInit, ViewEncapsulation,OnDestroy} from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/
import {coerceNumberProperty} from '@angular/cdk/coercion';
declare const AmCharts: any;
declare var $: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/pie.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/ammap.js';
import '../../../assets/charts/amchart/usaLow.js';

import '../../../assets/charts/float/jquery.flot.js';
import '../../../assets/charts/float/jquery.flot.categories.js';
import '../../../assets/charts/float/curvedLines.js';
import '../../../assets/charts/float/jquery.flot.tooltip.min.js';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-3d')(Highcharts);
require('highcharts/modules/drilldown.js')(Highcharts);
require('highcharts/modules/series-label.js')(Highcharts);
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);


import { ApiService,HighchartsService } from "../../_services/index.js";

@Component({
  selector: 'app-nationalitywupie',
  templateUrl: './nationalityWU.component.html',
  styleUrls: ['../myreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NationalityWUComponent implements OnInit, AfterViewInit, OnDestroy {
  
  

  Highcharts = Highcharts;

  

  optFromInputNationaltyString:any ={};

  
  constructor(public apiService:ApiService,public highchartsService:HighchartsService) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {
    let pdata={ param:'Nationality'}

    this.apiService.getReports(pdata).subscribe(data=>{
      let result:any=data;
      let result_arr:any={};
      result_arr.data=[];
      result.forEach(element => {
        result_arr.data.push({name:element.Nationality,y:element.NetPaidClaimAmt});
      });


      result_arr.title="Nationality Wise Utlization";
      result_arr.subtitle="";
      result_arr.yAxis="Nationality";
      result_arr.name="Nationality";
      

     let mmm= this.highchartsService.get3dpie(result_arr);
        console.log("highchartsService==>",mmm);
      
      this.optFromInputNationaltyString=mmm;
      this.updateInputChart();
      console.log("data==>",data);
    });
  }
 
  optFromInputNationalty = this.optFromInputNationaltyString;  
  updateFromInput = false;
  logChartInstance(chart: any) {
    console.log('Chart instance: ', chart);
  }
  updateInputChart() {
    this.optFromInputNationalty = this.optFromInputNationaltyString;
  }
 
  seriesTypes: {[key: string]: string} = {
    line: 'column',
    column: 'scatter',
    scatter: 'spline',
    spline: 'line'
  };
  toggleSeriesType(index = 0) {
    this.optFromInputNationalty.series[index].type = this.seriesTypes[this.optFromInputNationalty.series[index].type];
    // nested change - must trigger update
    this.updateFromInput = true;

  }
  ngAfterViewInit() {
  }

  ngOnDestroy(){
    //this.optFromInputNationalty.destroy();
    //this.optFromInputNationaltyString.destroy();
    //this.optFromInputNationaltyString=null;
    console.log("this.optFromInputNationalty===>",this.optFromInputNationalty);
  //   if(this.optFromInputNationalty){
  //   this.optFromInputNationalty.destroy()
  // }
  }

}
