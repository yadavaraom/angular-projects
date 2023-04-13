import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/
import {coerceNumberProperty} from '@angular/cdk/coercion';
declare const AmCharts: any;
declare var $: any;


import '../../assets/charts/amchart/amcharts.js';
import '../../assets/charts/amchart/gauge.js';
import '../../assets/charts/amchart/pie.js';
import '../../assets/charts/amchart/serial.js';
import '../../assets/charts/amchart/light.js';
import '../../assets/charts/amchart/ammap.js';
import '../../assets/charts/amchart/usaLow.js';

import '../../assets/charts/float/jquery.flot.js';
import '../../assets/charts/float/jquery.flot.categories.js';
import '../../assets/charts/float/curvedLines.js';
import '../../assets/charts/float/jquery.flot.tooltip.min.js';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-3d.js')(Highcharts);
require('highcharts/modules/drilldown.js')(Highcharts);
require('highcharts/modules/series-label.js')(Highcharts);
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);


import { ApiService } from "./../_services";


@Component({
  selector: 'app-dashboard',
  templateUrl: './app.dashboard.component.html',
  styleUrls: ['./app.dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppDashboardComponent implements OnInit, AfterViewInit {
  
  

  Highcharts = Highcharts;

  

  optFromInputString:any ={};

  productSegmentInputString:any ={};
  productsubSegmentInputString:any={};
 

  chartEcommerce: any;

  constructor(public apiService:ApiService) { // private servicePNotify: NotificationsService
  }

  condition:boolean=false;
  chartNow(e,val){
this.condition=val;
    console.log("ee===>",e);

  }



  ngOnInit() {

      this.apiService.getYearWisePremiumAndClaims().subscribe(data=>{
        
      console.log("data==>",data);

      this.chartEcommerce = AmCharts.makeChart('seo-ecommerce-barchart', {
        'type': 'serial',
        'theme': 'light',
        'marginTop': 0,
        'marginRight': 0,
        'dataProvider': data,
       
       
        'valueAxes': [{
          'axisAlpha': 0,
          // 'gridAlpha': 0,
          'dashLength': 6,
          'position': 'left'
        }],
        "startDuration": 1,
        'graphs': [{
          'id': 'g1',
          "title": "Premium Amt",
          'balloonText': '[[title]]: [[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
          'bullet': 'round',
          'bulletSize': 8,
          // 'fillAlphas': 0.1,
          'lineColor': '#448aff',
          'lineThickness': 2,
          'negativeLineColor': '#ff5252',
          'type': 'smoothedLine',
          'valueField': 'total_premium_amt'
        },{
          'id': 'g2',
          "title": "Claim Amt",
          'balloonText': '[[title]]: [[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
          'bullet': 'round',
          'bulletSize': 8,
          // 'fillAlphas': 0.1,
          'lineColor': '#448aff',
          'lineThickness': 2,
          'negativeLineColor': '#ff5252',
          'type': 'smoothedLine',
          'valueField': 'total_claim_amt'
        }],
        'chartScrollbar': {
          'graph': 'g1',
          'gridAlpha': 0,
          'color': '#888888',
          'scrollbarHeight': 55,
          'backgroundAlpha': 0,
          'selectedBackgroundAlpha': 0.1,
          'selectedBackgroundColor': '#888888',
          'graphFillAlpha': 0,
          'autoGridCount': true,
          'selectedGraphFillAlpha': 0,
          'graphLineAlpha': 0.2,
          'graphLineColor': '#c2c2c2',
          'selectedGraphLineColor': '#888888',
          'selectedGraphLineAlpha': 1
        },
        'chartCursor': {
          'categoryBalloonDateFormat': 'YYYY',
          'cursorAlpha': 0,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineAlpha': 0.5,
          'fullWidth': true
        },
        'dataDateFormat': 'YYYY',
        'categoryField': 'member_year',
        'categoryAxis': {
          'minPeriod': 'YYYY',
          'gridAlpha': 0,
          'parseDates': true,
          "listeners": [{
            "event": "clickItem",
            "method": function(e) {
              alert("Clicked on " + e.value);
            }
          }]
        },
      });




      setTimeout(() => {
        this.chartEcommerce.zoomToIndexes(Math.round(this.chartEcommerce.dataProvider.length * 0.3), Math.round(this.chartEcommerce.dataProvider.length * 0.55));
      }, 2500);

    });
    
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


    this.apiService.getNoOfPoliciesforEachYear().subscribe(data=>{
      let result:any=data;

      this.productSegmentInputString={
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
          //categories:result.policy_year,
          type: 'category',
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
						//drawChart();
                    }
                }
            }
        }
    
      },
      series: [{
        
        data: result.parent_data
       
      }],
      drilldown: {
        series:result.child_data
      }
      };
      this.updateProductInputChart();
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

  
  
  productSegmentFromInput = this.productSegmentInputString;
  updateproductSegmentFromInput=false;
  // Demonstrate chart instance
  pslogChartInstance(chart: any) {
    console.log('Chart instance: ', chart);
  }
  updateProductInputChart() {
    this.productSegmentFromInput = this.productSegmentInputString;
  }


  productsubSegmentFromInput = this.productsubSegmentInputString;
  updateproductsubSegmentFromInput=false;
  // Demonstrate chart instance
  pssublogChartInstance(chart: any) {
    console.log('Chart instance: ', chart);
  }
  updateProductsubInputChart() {
    this.productsubSegmentFromInput = this.productSegmentInputString;
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

    this.productSegmentFromInput.series[index].type = this.seriesTypes[this.productSegmentFromInput.series[index].type];
    this.updateproductSegmentFromInput=true;
  }
  ngAfterViewInit() {

  }

}
