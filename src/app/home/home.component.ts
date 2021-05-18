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
  public show: boolean = false;
  public show2: boolean = false;
  public buttonName: any = 'Show';
  public buttonName2: any = 'Show2';
  dataTemplate2 = {
    name: "",
    Seats: ""
  };
  dataTemplate={
    college: "",
    collegeCode:"",
    courseTemplate:"",
    Description:"",
    OwnershipType:"",
    collegeStrength:"",
    established:"",
    UGC_Reg_ID: "",
    AICTE_Reg_ID: "",
    SubjectListCollege: [
    ]
  };
  dataTemplateDep={
    dept: "",
    deptCode:"",
    Description:"",
    established:"",
    UGC_Reg_ID: "",
    AICTE_Reg_ID: "",
    SubjectListDept: [
    ]
  };
  constructor(public router: Router,public global:Globals) { 
   
   
  }
  onPressAddSubject() {
    this.dataTemplate.SubjectListCollege.push(this.dataTemplate2);
    this.dataTemplate2 = {
      name: "",
      Seats: ""
    };
    this.toggle();
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  onPressAddSubject2() {
    this.dataTemplateDep.SubjectListDept.push(this.dataTemplate2);
    this.dataTemplate2 = {
      name: "",
      Seats: ""
    };
    this.toggle2();
  }
  toggle2() {
    this.show2 = !this.show2;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show2)
      this.buttonName2 = "Hide2";
    else
      this.buttonName2 = "Show2";
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
      AICTE_Reg_ID: "",
      SubjectListCollege: [
      ]
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
      AICTE_Reg_ID: "",
      SubjectListDept: [
      ]
    };
    
    
   }

}
