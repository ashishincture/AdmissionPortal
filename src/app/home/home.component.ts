import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Globals} from '../globals'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {}

  data: string="hello";
  dataTemplate={
    college: "",
    collegeCode:"",
    courseTemplate:"",
    Description:"",
    OwnershipType:"",
    collegeStrength:"",
    established:"",
    UGC_Reg_ID: "",
    AICTE_Reg_ID: ""
  };
  dataTemplateDep={
    dept: "",
    deptCode:"",
    Description:"",
    established:"",
    UGC_Reg_ID: "",
    AICTE_Reg_ID: ""
  };
  constructor(public router: Router,public global:Globals) { 
   
   
  }
 
  onPressSubmit(){
   
    this.global.data.CollegeDetail.push(this.dataTemplate);
    this.dataTemplate={
      college: "",
      collegeCode:"",
      courseTemplate:"",
      Description:"",
      OwnershipType:"",
      collegeStrength:"",
      established:"",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: ""
    };
    
   
   }
   onPressSubmitDept(){
   
    this.global.data.DeptDetail.push(this.dataTemplateDep);
    this.dataTemplateDep={
      dept: "",
      deptCode:"",
      Description:"",
      established:"",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: ""
    };
    
    
   }

}
