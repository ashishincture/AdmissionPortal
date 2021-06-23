import { core } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


export interface SubjectClass {
  code: string;
  id: string;
  type:string;
  name:string;
  description:string;
  credits:number;
}
export interface CRSubjectClass {
  code: string;
  id: string;
  type:string;
  name:string;
  description:string;
  credits:number;
  groupNme:string;
}
export interface SemClass{
  id:string;
  subjects:CRSubjectClass[];
}
export interface DeptCr{
  id:string;
  sems:SemClass[];
}
export interface ADyear{
  startYear:number;
  endYear:number;
  Departments:DeptCr[];
}
export interface CrClass {
  code: string;
  id: string;
  academicYears:ADyear[];
}
export interface Department{
  code:string;
  description:string;
  Subjects:SubjectClass[];
 }
 export interface RegulationClass{
   semid:string;
   types:typeClass[];
   totalcredits:number;
 }
 export interface typeClass{
   id:string;
   no:number;
 }
 export interface crinReg{
   regulationid:string;
   crs:string[];
 }

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {
  // subjectsData:SubjectClass[]=[
  //   {code:'01',id:'subject01'},
  //   {code:'02',id:'subject02'},
  //   {code:'03',id:'subject03'},
  //   {code:'04',id:'subject04'},
  //   {code:'05',id:'subject05'}
  // ];
  uri:string = 'https://university-app-2021.herokuapp.com';
  instid = "IN0010";

  constructor(private http: HttpClient) { }
  
  
  subjecttypes=['CORE','PE','OE'];
 
  
  
  newCRData={
    Curriculum_Name:"",
    Curriclum_Code:"",
    Regulation_ID:"",
    Batch_Year:"",
    Department_ID:"",
    Semester_Data:[
    {
    Semester_NO:1,
    Subjects:[]
    }]
  };
  RegSData;
  
  getDeptSData(regId){
    return this.getRegData().subscribe((data:any)=>{
      this.RegSData=data.data.Regulation;
      //this.RegSData.pop();
      //debugger;
      return this.RegSData.find(({Regulation_ID})=>Regulation_ID===regId).Department_Details      
    });
    //return this.RegSData.find(({Regulation_ID})=>Regulation_ID===regId).Department_Details

    // return this.http.get(`${this.uri}/institute/view/${this.instid}/${regId}`);
  }
  getRegData(){
    return this.http.get(`${this.uri}/Regulation/getregulation/${this.instid}`);
  }
  getRegsDetails(reg_ID,dept_ID){
    this.getRegData().subscribe((data:any)=>{
      this.RegSData=data.data.Regulation;
      //this.RegSData.pop();
      //debugger;
      let deptdata=this.RegSData.find(({Regulation_ID})=>Regulation_ID===reg_ID).Department_Details;
      let CreditDetails= deptdata.find(({Department_ID})=>Department_ID===dept_ID);
      return CreditDetails;
    });
    // return this.http.get(`${this.uri}/Regulation/getregulation/${this.instid}/${reg_ID}`);
  }
  getCRDetails(reg,DeptID,BYr){
    return this.http.get(`${this.uri}/curriculum/getcurriculum/${this.instid}/${reg}/${DeptID}/${BYr}`);
  }
  updateCRData(subjData,semNo){
   
    for(var i=0;i<this.newCRData.Semester_Data.length;i++){
      if(this.newCRData.Semester_Data[i].Semester_NO===semNo){
        for(var j=0;j<subjData.length;j++){
          
          let num=this.newCRData.Semester_Data[i].Subjects.findIndex((subj)=>{
            if(subj.Subject_Code===subjData[j].Subject_Code){
            return true
            }
            })
          if(num === -1){
           
            this.newCRData.Semester_Data[i].Subjects.push(subjData[j]);
          }
        }
        //this.newCRData.semData[i].subjects=this.newCRData.semData[i].subjects.concat(subjData);
      }
    }
    
  }
  coreCount;PEcount;OEcount;
  verifyCRwithReg(semNo){
      let semData=this.newCRData.Semester_Data.find(({Semester_NO})=>Semester_NO===semNo);
      let deptDetails=this.RegSData.find(({Regulation_ID})=>Regulation_ID===this.newCRData.Regulation_ID).Department_Details;
      let CreditDetails= deptDetails.find(({Department_ID})=>Department_ID===this.newCRData.Department_ID);
      let RegSemDetails=CreditDetails.Credits_Details.find(({sNo})=>sNo===semNo);
      if(RegSemDetails.Core<this.coreCount||RegSemDetails.Core===0||RegSemDetails.Core>this.coreCount){
        alert("Select appropriate number of CORE subjects");
        return false;
      }
      if(RegSemDetails.PE<this.PEcount||RegSemDetails.PE>this.PEcount){
        alert("Select appropriate number of PE subjects");
        return false;
      }
      if(RegSemDetails.OE<this.OEcount||RegSemDetails.OE>this.OEcount){
        alert("Select appropriate number of OE subjects");
        return false;
      }
      return true;
    }
    verifyCRCreatewithReg(semNo,subtype){
      let semData=this.newCRData.Semester_Data.find(({Semester_NO})=>Semester_NO===semNo);
      let deptDetails=this.RegSData.find(({Regulation_ID})=>Regulation_ID===this.newCRData.Regulation_ID).Department_Details;
      let CreditDetails= deptDetails.find(({Department_ID})=>Department_ID===this.newCRData.Department_ID);
      let RegSemDetails=CreditDetails.Credits_Details.find(({sNo})=>sNo===semNo);
      if(subtype==="CORE"){
        if(RegSemDetails.Core<this.coreCount||RegSemDetails.Core===0){
          alert("The required number of subjects are already selected");
          return false;
        }
        return true;
      }
      if(subtype==="PE"){
        if(RegSemDetails.PE<this.PEcount||RegSemDetails.PE===0){
          alert("The required number of subjects are already selected");
          return false;
        }
        return true;
      }
      if(subtype==="OE"){
        if(RegSemDetails.OE<this.OEcount||RegSemDetails===0){
          alert("The required number of subjects are already selected");
          return false;
        }
        return true;
      }

    }
}
