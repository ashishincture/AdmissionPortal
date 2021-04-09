import { Component, OnInit,ViewChild } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../subject.service';
// import {SubjectClass} from "../models/SubjectClass.model";
// import {Batch} from "../data";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Batch{
  Batch_ID: string;
  Batch_Name: string;
  Academic_Year: Array<any>;
  Regulation_ID: string;
}
export interface Regulation{
  Regulation_ID: string;
  Regulation_Name: string;
  Academic_Year: Array<any>;
}
export interface Department{
  Department_Name: string;
  Department_ID: string;
}
export interface Subject{
  Subject_ID: string;
  Subject_Name: string;
  isActive:boolean;
  Type:string;
  Department_ID:string;
  Regulation_ID:string;
  Credit:string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  Regulations: Regulation[]=[];
  Departments:Department[]=[];
  Subjects:Subject[]=[];
  dataSource = this.Subjects;
  dummy=this.Subjects;
  SubSearchKey:any;
  subjectInstance:Subject={
    Subject_ID: "",
    Subject_Name: "",
    isActive:false,
    Type:"",
    Department_ID:"",
    Regulation_ID:"",
    Credit:"",
  }; 
  displayedColumns: string[] = ['Subject_ID', 'Subject_Name', 'Type','Credit','active','actions']; 
  @ViewChild(MatTable)
  table!: MatTable<any>;
  constructor(public dialog: MatDialog,private SubjectService:SubjectService) { }
  ngOnInit(): void {
    this.fetchRegulation();
    this.fetchDepartment();
    this.fetchSubjectlist();
  }
  fetchRegulation(){
    this.SubjectService.getRegulation().
    subscribe((data:any)=>{
      this.Regulations=data.data;
    });
  }
  fetchDepartment(){
    this.SubjectService.getDepartment().
    subscribe((data:any)=>{
      this.Departments=data.data;
    });
  }
  fetchSubjectlist(){
    this.SubjectService.getSubjectList().
    subscribe((data:any)=>{
      this.Subjects=data.data;
      this.dataSource = data.data;
      console.log(this.Subjects);
    });
  }
  onAddNewSubject() {
    const dialogRef = this.dialog.open(UpdateDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.SubjectService.createSubject(result.data).subscribe((data:any)=>{
        console.log(data.data.msg);
      });
      this.fetchSubjectlist();
      this.table.renderRows();
    });
}
onEditSubject(id:any){
console.log(id);
const dialogRef = this.dialog.open(UpdateDialogComponent);
}
SubSearch(){
if(this.SubSearchKey == ""){
  this.ngOnInit();
}
else{
  this.dataSource = this.Subjects.filter(res =>{
    // const array =[];
    // const SubName = res.Subject_Name.toLocaleLowerCase().match(this.SubSearchKey.toLocaleLowerCase());
    // const SubCode = res.Subject_ID.toLocaleLowerCase().match(this.SubSearchKey.toLocaleLowerCase());
    // const subType = res.Type.toLocaleLowerCase().match(this.SubSearchKey.toLocaleLowerCase());
    // array.push(SubName);
    // array.push(SubCode);
    // array.push(subType);
    // return array;
    return res.Subject_Name.toLocaleLowerCase().match(this.SubSearchKey.toLocaleLowerCase());
  });
}
}
key ="Subject_Name";
reverse:boolean = false;
SubSort(Subject_Name:any){
this.key = Subject_Name;
this.reverse = !this.reverse;
}
}
