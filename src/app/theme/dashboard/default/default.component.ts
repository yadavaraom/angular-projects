import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/

declare const AmCharts: any;
declare var $: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/usaLow.js';

import '../../../../assets/charts/float/jquery.flot.js';
import '../../../../assets/charts/float/jquery.flot.categories.js';
import '../../../../assets/charts/float/curvedLines.js';
import '../../../../assets/charts/float/jquery.flot.tooltip.min.js';

import { ApiService } from "../../../_services";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit, AfterViewInit {
  options: any = {
    position: ['bottom', 'right'],
  };

  chartOption: any = {
    legend: {
      show: false
    },
    series: {
      label: '',
      curvedLines: {
        active: true,
        nrSplinePoints: 20
      },
    },
    tooltip: {
      show: true,
      content: 'x : %x | y : %y'
    },
    grid: {
      hoverable: true,
      borderWidth: 0,
      labelMargin: 0,
      axisMargin: 0,
      minBorderMargin: 0,
    },
    yaxis: {
      min: 0,
      max: 30,
      color: 'transparent',
      font: {
        size: 0,
      }
    },
    xaxis: {
      color: 'transparent',
      font: {
        size: 0,
      }
    }
  };

  chartEcommerce: any;

  constructor(public apiService:ApiService) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {
    //setTimeout(() => {

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
      //}, 75);

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
