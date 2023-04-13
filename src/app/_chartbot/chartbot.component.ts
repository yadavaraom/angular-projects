import {AfterViewInit, Component, OnInit, ViewEncapsulation,Injectable, NgZone,OnDestroy} from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/
import {coerceNumberProperty} from '@angular/cdk/coercion';
declare const AmCharts: any;
declare var $: any;

import { Observable } from 'rxjs/Rx';


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


import { ApiService } from "../_services";
import { SpeechRecognitionService } from "../_services/speech-recognition.service";
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-chartbot',
  templateUrl: './chartbot.component.html',
  styleUrls: ['./chartbot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartbotComponent implements OnInit, AfterViewInit,OnDestroy {
  
  

  Highcharts = Highcharts;

  speechRecognition: any;

  optFromInputString:any ={};

  productSegmentInputString:any ={};
  productsubSegmentInputString:any={};
 
  showSearchButton: boolean;
  speechData: string;

  chartEcommerce: any;

  constructor(public apiService:ApiService,private speechRecognitionService: SpeechRecognitionService) { // private servicePNotify: NotificationsService

    this.showSearchButton = true;
    this.speechData = "";
  }

  condition:boolean=false;
  chartNow(e,val){
this.condition=val;
    console.log("ee===>",e);

  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
            this.speechData = value;
            console.log(value);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.activateSpeechSearchMovie();
            }
        },
        //completion
        () => {
            this.showSearchButton = true;
            console.log("--complete--");
            this.activateSpeechSearchMovie();
        });
}


  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

 


 
 

  ngOnInit() {

    $(".chat-closed").on("click",function(e){
      alert("hi")
        $(".chat-header,.chat-content").removeClass("hide");
        $(this).addClass("hide");
    });

    $(".chat-header").on("click",function(e){
        $(".chat-header,.chat-content").addClass("hide");
        $(".chat-closed").removeClass("hide");
    });

    var accessToken ="6835e1f68e7d41dbb63d67c5ba84f061";
    //var accessToken ="8c21e90c6ca24f2eb2cdaed26fae2dbb";
    var baseUrl = "https://api.dialogflow.com/v1/";
    
        $("#input").keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                //send();
                console.log("send");
                this.value = '';
            }
        });
        $("#rec").click(function(event) {
            //switchRecognition();
            console.log("rec");
        });
    
    

    

  }

  subProduct(data){
    // let 
    // this.apiService.getMonthWisePremiumAndClaims().subscribe(data=>{
      
    // })
  }




 
  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
}
}
