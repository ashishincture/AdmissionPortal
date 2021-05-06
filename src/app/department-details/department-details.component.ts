import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  arr=Array;
  Table_Data = this.service.getTableData();
  displayedColumns: string[] = ['sNo', 'subjectName', 'subjectCode', 'shortCode','credits','action'];
  dataSource = this.Table_Data;
  constructor(
    private service:DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  onAddSubject(){
    this.router.navigate(['addsubject']);
  }
  onEditSubject(rowData,rowNum){
    console.log(rowData);
  this.service.rownumber=rowNum;
  this.service.editData(rowData);
  this.router.navigate(['editsubject']);
  }

}
