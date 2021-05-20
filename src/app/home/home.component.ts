import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
uri: string=' https://university-app-2021.herokuapp.com/institute/add';

  ngOnInit(): void {}

  data: string="hello";
  public show: boolean = false;
  public show2: boolean = false;
  public buttonName: any = 'Show';
  public buttonName2: any = 'Show2';
  dataTemplate2 = {
    Course_id: "",
    Course_name:"",
    Course_description:"",
    AICTE_Reg_ID:"",
    UGC_Reg_ID:"",
    Course_type:"",
    Seats: "",
    Course_duration:""
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
      courseTemplate:"",
      Description:"",
      OwnershipType:"",
      deptStrength:"",
      established:"",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: "",
      SubjectListDept: [
      ]
  };
  constructor(public router: Router,public global:Globals, public http:HttpClient) { 
   
   
  }
  onPressAddSubject() {
    this.dataTemplate.SubjectListCollege.push(this.dataTemplate2);
    this.dataTemplate2 = {
        Course_id: "",
        Course_name:"",
        Course_description:"",
        AICTE_Reg_ID:"",
        UGC_Reg_ID:"",
        Course_type:"",
        Seats: "",
        Course_duration:""
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
      Course_id: "",
      Course_name:"",
      Course_description:"",
      AICTE_Reg_ID:"",
      UGC_Reg_ID:"",
      Course_type:"",
      Seats: "",
      Course_duration:""
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
    let univ =this.http.post(`${this.uri}`,{
      Institution_id:this.dataTemplate.collegeCode,
      Institution_name:this.dataTemplate.college,
      Institution_strength:this.dataTemplate.collegeStrength,
      AICTE_Reg_ID:this.dataTemplate.AICTE_Reg_ID,
      UGC_Reg_ID:this.dataTemplate.UGC_Reg_ID,
      Institution_description:this.dataTemplate.Description,
      Institution_type:"College",
      Institution_template:this.dataTemplate.courseTemplate,
      Institution_established:this.dataTemplate.established,
      ownershipType:this.dataTemplate.OwnershipType,
      courseDetails:this.dataTemplate.SubjectListCollege
  });
  univ.subscribe((data: any) => console.log(data));
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
    let univ =this.http.post(`${this.uri}`,{
      Institution_id:this.dataTemplateDep.deptCode,
      Institution_name:this.dataTemplateDep.dept,
      Institution_strength:this.dataTemplateDep.deptStrength,
      AICTE_Reg_ID:this.dataTemplateDep.AICTE_Reg_ID,
      UGC_Reg_ID:this.dataTemplateDep.UGC_Reg_ID,
      Institution_description:this.dataTemplateDep.Description,
      Institution_type:"College",
      Institution_template:this.dataTemplateDep.courseTemplate,
      Institution_established:this.dataTemplateDep.established,
      ownershipType:this.dataTemplateDep.OwnershipType,
      courseDetails:this.dataTemplateDep.SubjectListDept
  });
  univ.subscribe((data: any) => console.log(data));
    this.dataTemplateDep={
      dept: "",
      deptCode:"",
      courseTemplate:"",
      Description:"",
      OwnershipType:"",
      deptStrength:"",
      established:"",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: "",
      SubjectListDept: [
      ]
    };
    
    
   }

}
