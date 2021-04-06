import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Globals} from '../globals'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: string="hello";
  dataTemplate={
    college: "",
    colleges:"",
    collegeCode:"",
    departments:"",
    TemplateType:"",
    Description:"",
    InstitutionType:"",
    OwnershipType:"",
    collegeStrength:"",
    established:"",
    UGC_Reg_ID: "",
    AICTE_Reg_ID: ""
  };
  constructor(public router: Router,public global:Globals) { 
   
   
  }
 
  onPressSubmit(){
    var sample= this.global.data.CollegeDetail;

    console.log(this.dataTemplate);
    console.log(this.global.data);
    console.log(this.data);
    this.global.data.CollegeDetail.push(this.dataTemplate);
    
    
    console.log(this.global.data.CollegeDetail);
   }
  ngOnInit(): void {
  }

}
