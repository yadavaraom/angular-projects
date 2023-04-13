import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/
import {coerceNumberProperty} from '@angular/cdk/coercion';
declare const AmCharts: any;
declare var $: any;
declare var require: any;

import * as Highcharts from 'highcharts';
require('highcharts/highcharts-3d')(Highcharts);
require('highcharts/modules/drilldown.js')(Highcharts);
require('highcharts/modules/series-label.js')(Highcharts);
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);

// import * as Highcharts from "highcharts/highstock";
// const IndicatorsCore = require("highcharts/indicators/indicators");
// IndicatorsCore(Highcharts);
// const IndicatorZigZag = require("highcharts/indicators/zigzag");
// IndicatorZigZag(Highcharts);

// import * as Highcharts from 'highcharts/highstock';
// //const HC_map = require('highcharts/modules/map');
// //HC_map(Highcharts);
// const HC_exporting = require('highcharts/modules/exporting');
// HC_exporting(Highcharts);
// const HC_3d =require('highcharts/highcharts-3d');
// HC_3d(Highcharts);

import { ApiService,HighchartsService } from "../_services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit, AfterViewInit {
  options: any = {
    position: ['bottom', 'right'],
  };  
  
  Highcharts=Highcharts;
  //optFromInputString:any ={};
  optFromInputString:any={};
  
  

  constructor(public apiService:ApiService) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {
    
    this.apiService.getYearWiseNoOfContractsSplittedPremiumAndClaims().subscribe(data=>{
      let result:any=data;

      this.optFromInputString={
        chart: {
          type: 'column',
          options3d: {
              enabled: true,
              alpha: 20,
              beta: 24,
              viewDistance: 25,
              depth: 40
          }
      },
    
      title: {
          text: ''
      },
    
      xAxis: {
          //categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
          categories:result.year_clients,
          labels: {
              skew3d: true,
              style: {
                  fontSize: '16px'
              }
          }
      },
    
      yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
              text: 'Number of fruits',
              skew3d: true
          }
      },
    
      tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
      },
    
      plotOptions: {
          column: {
              stacking: 'normal',
              depth: 40
          },
          series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        alert('Category: ' + this.category + ', value: ' + this.y);
                        this.updateInputChart();
                        //drawChart();
                    }
                }
            }
        }
    
      },
      series: [{
        name: 'Premium',
        data: result.prm_clients,
        stack: 'Premium'
      }, {
        name: 'Claim',
        data: result.clm_clients,
        stack: 'Claim'
      }]
      };
      this.updateInputChart();
      console.log("data==>",data);
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
    /*setTimeout(() => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 992) {
        this.options = {
          position: ['bottom', 'right'],
          maxStack: 8,
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: true,
          lastOnBottom: true,
          clickToClose: true,
          preventDuplicates: false,
          preventLastDuplicates: false,
          theClass: 'bg-c-red no-icon',
          rtl: false,
          animate: 'rotate'
        };
        let html = '<h4>Live customizer</h4> <p>Click on Right Gear icon <i class="feather icon-settings"></i>';
        html += 'for apply live styles very first time in Angular 5.</p>';
        this.servicePNotify.html(
          html,
          'success'
        );
      }
    }, 75);*/
  }


}
