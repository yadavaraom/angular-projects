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
require('highcharts/highcharts-3d.js')(Highcharts);
require('highcharts/modules/drilldown.js')(Highcharts);
require('highcharts/modules/series-label.js')(Highcharts);
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);


import { ApiService,HighchartsService } from "../../_services/index.js";


@Component({
  selector: 'app-ageband',
  templateUrl: './ageband.component.html',
  styleUrls: ['../myreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgebandComponent implements OnInit, AfterViewInit, OnDestroy  {
   Highcharts = Highcharts;
  optFromInputString:any ={};

  chartEcommerce: any;
  constructor(public apiService:ApiService,public highchartsService:HighchartsService) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {

    this.chartEcommerce  = AmCharts.makeChart("chartdiv", {
      "theme": "light",
      "type": "serial",
    "startDuration": 2,
      "dataProvider": [{
          "country": "USA",
          "visits": 4025,
          "color": "#FF0F00"
      }, {
          "country": "China",
          "visits": 1882,
          "color": "#FF6600"
      }, {
          "country": "Japan",
          "visits": 1809,
          "color": "#FF9E01"
      }, {
          "country": "Germany",
          "visits": 1322,
          "color": "#FCD202"
      }, {
          "country": "UK",
          "visits": 1122,
          "color": "#F8FF01"
      }, {
          "country": "France",
          "visits": 1114,
          "color": "#B0DE09"
      }, {
          "country": "India",
          "visits": 984,
          "color": "#04D215"
      }, {
          "country": "Spain",
          "visits": 711,
          "color": "#0D8ECF"
      }, {
          "country": "Netherlands",
          "visits": 665,
          "color": "#0D52D1"
      }, {
          "country": "Russia",
          "visits": 580,
          "color": "#2A0CD0"
      }, {
          "country": "South Korea",
          "visits": 443,
          "color": "#8A0CCF"
      }, {
          "country": "Canada",
          "visits": 441,
          "color": "#CD0D74"
      }, {
          "country": "Brazil",
          "visits": 395,
          "color": "#754DEB"
      }, {
          "country": "Italy",
          "visits": 386,
          "color": "#DDDDDD"
      }, {
          "country": "Australia",
          "visits": 384,
          "color": "#999999"
      }, {
          "country": "Taiwan",
          "visits": 338,
          "color": "#333333"
      }, {
          "country": "Poland",
          "visits": 328,
          "color": "#000000"
      }],
      "valueAxes": [{
          "position": "left",
          "title": "Visitors"
      }],
      "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "fillColorsField": "color",
          "fillAlphas": 1,
          "lineAlpha": 0.1,
          "type": "column",
          "valueField": "visits"
      }],
      "depth3D": 20,
    "angle": 30,
      "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
          "gridPosition": "start",
          "labelRotation": 90
      },
      "export": {
        "enabled": true
       }
  
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
    let pdata={ param:'Ageband'}
    this.apiService.getReports(pdata).subscribe(data=>{
      this.updateInputChart();
      let result:any=data;
      let result_arr:any={};
      result_arr.label=[];
      result_arr.data=[];
      result.forEach(element => {
        result_arr.label.push(element.AgeBand)
        result_arr.data.push(element.NetPaidClaimAmt);
      });
      result_arr.title="Ageband Wise Utilization";
      result_arr.yAxis="Net Paid Claim Amt";
      //this.optFromInputString=this.highchartsService.getHighcharts(result_arr);
      this.optFromInputString={
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
          }
      },    
      title: {
          text: result_arr.title
      },    
      xAxis: {
          categories:result_arr.label,
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
              text: result_arr.yAxis,
              skew3d: true
          }
      },    
      tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
      },    
      plotOptions: {
          column: {
              //stacking: 'normal',
              depth: 25
          },
          series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        console.log('Category: ' + this.category + ', value: ' + this.y);
                    }
                }
            }
        }
      },
      series: [{
        data: result_arr.data,
      }]
      }
      setTimeout(()=>{ 
      this.updateInputChart();
      
          
      
      //location.reload();
    }, 500);
      console.log("data==>",data);
    });

  }

  ngOnDestroy(){
    //this.optFromInput.destroy();
    //this.optFromInputString.destroy();
    //this.optFromInputString=null;
    console.log("this.optFromInput===>",this.optFromInput);
  //   if(this.optFromInput){
  //   this.optFromInput.destroy()
  // }
  }

}
