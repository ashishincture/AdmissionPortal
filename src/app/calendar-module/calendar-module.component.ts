import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { colors } from '../demo-utils/colors';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-calendar-module',
  templateUrl: './calendar-module.component.html',
  styleUrls: ['./calendar-module.component.css', './calendar-module.component.scss']
})
export class CalendarModuleComponent implements OnInit {
  private readonly darkThemeClass = 'dark-theme';
  constructor(private router: Router, @Inject(DOCUMENT) private document) {  }
 
  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }
  
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  goToCal() : any {
    this.router.navigate(['calendar']);
    }
    goToTimetable(): any{
      this.router.navigate(['timetable']);
    }
  

}
