import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: any;
  constructor(private SubjectService: SubjectService) { }

  ngOnInit(): void {
    this.fetchRegulation();
  }

  fetchRegulation() {
  
    this.SubjectService.getDepartment().
      subscribe((data: any) => {
        console.log(data);
        this.departments = data.data;
      });
  }
}
