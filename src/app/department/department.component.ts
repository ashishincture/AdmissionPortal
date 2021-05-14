// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-department',
//   templateUrl: './department.component.html',
//   styleUrls: ['./department.component.css']
// })
// export class DepartmentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchRegulation();
  }
  fetchRegulation() {
    this.departments = [
      { dept: 'CSE' },
      { dept: 'ECE' },
      { dept: 'EEE' },
      { dept: 'MECH' },
    ];
  }
}
