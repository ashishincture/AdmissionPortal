import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: any;
  constructor(
    private SubjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchDepartment();
  }

  fetchDepartment() {
    this.SubjectService.getDepartment().subscribe((data: any) => {
      console.log(data);
      this.departments = data.data.Regulation[0].Department_Details;
    });
  }
  onDeptPress(data) {
   let navigationExtras:NavigationExtras={
     state:{
       data:data
     }
   }
  this.router.navigate(['/subject'],navigationExtras);
  }
}
