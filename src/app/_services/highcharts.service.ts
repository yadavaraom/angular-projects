import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User,Role,Permission } from '../_models';

@Injectable()
export class HighchartsService {
    highchart:any={};
    getHighcharts(data){
        this.highchart={
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
              text: data.title
          },    
          xAxis: {
              categories:data.label,
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
                  text: data.yAxis,
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
                            console.log('Category: ' + this.category + ', value: ' + this.y);
                        }
                    }
                }
            }
          },
          series: [{
            data: data.data,
          }]
          };

    return this.highchart;
}

getHighchartsPie(data,Highcharts){
    this.highchart= {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: data.title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: data.name,
            colorByPoint: true,
            data: data.data
        }]
    }
    return this.highchart;
}

get3dpie(data){
    this.highchart={
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: data.title
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: data.name,
            data: data.data
            
        }]
    
    }
    return this.highchart;
}

}