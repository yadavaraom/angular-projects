import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  selector: 'app-benefitwu',
  templateUrl: './benefitWU.component.html',
  styleUrls: ['../myreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BenefitWUComponent implements OnInit, AfterViewInit {
  
  

  Highcharts = Highcharts;

  

  optFromInputString:any ={};

  
  constructor(public apiService:ApiService,public highchartsService:HighchartsService) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {
    let pdata={ param:'Claims'}
    this.apiService.getReports(pdata).subscribe(data=>{
      let result:any=data;
      let result_arr:any={};      
      result_arr.data=[];
      result.forEach(element => {
        result_arr.data.push([element.TYPE_OF_CLAIM,element.NetPaidClaimAmt]);
      });
      console.log("result_arr.data==>",JSON.stringify(result_arr.data));
      result_arr.title="Benefit Wise Utilization";
      result_arr.name="Benefit Wise";
      this.optFromInputString=this.highchartsService.get3dpie(result_arr);      
      this.updateInputChart();
      //console.log("data==>",data);
    });
  }
  

  optFromInput = this.optFromInputString;  
  updateFromInput = false;
  logChartInstance(chart: any) {
    console.log('Chart instance: ', chart);
  }
  updateInputChart() {
    this.optFromInput = this.optFromInputString;
  }
 
  seriesTypes: {[key: string]: string} = {
    line: 'column',
    column: 'scatter',
    scatter: 'spline',
    spline: 'line'
  };
  toggleSeriesType(index = 0) {
    this.optFromInput.series[index].type = this.seriesTypes[this.optFromInput.series[index].type];
    // nested change - must trigger update
    this.updateFromInput = true;

  }
  ngAfterViewInit() {
  }

}
