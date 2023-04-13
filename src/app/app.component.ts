import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Able Pro 7 6';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private router: Router,private idle: Idle, private keepalive: Keepalive,private dialog: MatDialog) {
    let vm =this;
    
      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(360);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(360);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  
      idle.onIdleEnd.subscribe(() => vm.idleState = 'No longer idle.');
      idle.onTimeout.subscribe(() => {
        vm.idleState = 'Timed out!';
        
        console.log("vm.idleState===>",vm.idleState);
        vm.logout();
        vm.timedOut = true;
      });
      idle.onIdleStart.subscribe(() => vm.idleState = 'You\'ve gone idle!');
      idle.onTimeoutWarning.subscribe((countdown) => {
        
        vm.idleState = 'You will time out in ' + countdown + ' seconds!'}
      );
  
      // sets the ping interval to 15 seconds
      keepalive.interval(15);
  
      keepalive.onPing.subscribe(() => vm.lastPing = new Date());
  
      vm.reset();

   }
   reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  logout() {

   
      localStorage.clear();
     //localStorage.removeItem('token');
     

      window.location.href = [window.location.href.split('/app')[0], '/login?returnUrl=%2Fapp%2F#/home'].join('');


   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
