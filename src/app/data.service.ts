import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormArray } from '@angular/forms';
import { Data } from './data.model';



export interface regulationList {
  regulationName: string;
}

export interface tableData {
  sNo: number;
  subjectName: string;
  subjectCode: string;
  shortCode: string;
  credits: number;
}
export interface formEditData {
  subjectName: string;
  subjectCode: string;
  shortCode: string;
  credits: number;
}
export interface subTypes {
  sNo: number;
  Core: number;
  PE: number;
  OE: number
}

export interface regulationDetails {
  depName: string;
  sem: number;
  totalCredits: number;
  subjects: subTypes[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri: string = 'https://university-app-2021.herokuapp.com';

  oldData;
  rownumber;
  data;
  RId;
  regulationDatabyId;
  regulationDataTable;
  subjectsbyDepid;
  DataAddReg;
  eidtFlag = false;
  instid = "IN0010";
  allDeps;

  regulationListData: regulationList[] = [
    { regulationName: 'R15' },
    { regulationName: 'R16' },
    { regulationName: 'R17' },
    { regulationName: 'R18' },
    { regulationName: 'R19' },
    { regulationName: 'R20' },
    { regulationName: 'R21' }
  ]
  tableDisplayData: tableData[] = [
    { sNo: 1, subjectName: 'VLSI', subjectCode: '15EC1234', shortCode: 'VLSI', credits: 4 },
    { sNo: 2, subjectName: 'Communication Systems', subjectCode: '15EC1232', shortCode: 'CS', credits: 4 },
    { sNo: 3, subjectName: 'Signal Processing', subjectCode: '15EC1334', shortCode: 'SP', credits: 4 },
    { sNo: 4, subjectName: 'Digital Design', subjectCode: '15EC1134', shortCode: 'DLD', credits: 4 },
    { sNo: 5, subjectName: 'Electro Magnetics', subjectCode: '15EC1224', shortCode: 'EM', credits: 4 },
    { sNo: 6, subjectName: 'Control Systems', subjectCode: '15EC1214', shortCode: 'CS', credits: 4 }
  ]
  regulationDetailsData: regulationDetails[] = [{
    depName: "ECE",
    sem: 3,
    totalCredits: 28,
    subjects: [{ sNo: 1, Core: 4, OE: 4, PE: 4 },
    { sNo: 2, Core: 4, OE: 4, PE: 4 },
    { sNo: 3, Core: 4, OE: 4, PE: 4 },
    ]
  },
  {
    depName: "CSE",
    sem: 5,
    totalCredits: 28,
    subjects: [{ sNo: 1, Core: 4, OE: 4, PE: 4 },
    { sNo: 2, Core: 4, OE: 4, PE: 4 },
    { sNo: 3, Core: 4, OE: 4, PE: 4 },
    { sNo: 4, Core: 4, OE: 4, PE: 4 },
    { sNo: 5, Core: 4, OE: 4, PE: 4 }
    ]
  }
  ]
  constructor(private http: HttpClient) { }
  getInstitutionList(){
    return this.http.get(this.uri+"/institute/all/");
  }
  getRegulationData() {
    // var instid = "IN0010";
    return this.http.get(`${this.uri}/Regulation/getregulation/${this.instid}`);
  }
  getAllDeps(){
    return this.http.get(`${this.uri}/institute/view/${this.instid}`);
  }
  getRegulationDatabyID(rID) {
    let Regulation_Id = rID;
    let rData = this.http.get(`${this.uri}/Regulation/${Regulation_Id}`);
    rData.subscribe((data: any) => {
      this.regulationDatabyId = data.data;
      this.regulationDataTable = data.data.Department_Details;
      console.log(this.regulationDataTable);
      console.log(this.regulationDatabyId);
    }
    );
    // rData.subscribe((data:any)=>console.log(data.data.Department_Details));          
  }
  getSubjectsbyId(depId) {
    let depID = depId;
    let subData = this.http.get(`${this.uri}/Department/${depID}`);
    subData.subscribe((data: any) => console.log(data));
  }
  getTableData(): tableData[] {
    return this.tableDisplayData;
  }
  getRegulationDetailsData(rID) {
    // console.log(this.regulationDatabyId);
    // return this.regulationDatabyId;
    let Regulation_Id = rID;
    return this.http.get(`${this.uri}/Regulation/getdepartmentdetailsbyid/${this.instid}/${Regulation_Id}`);
    // return rData.subscribe((data: any) => {
    //   // complete(){
    //   //   this.regulationDatabyId = data.data;
    //   // this.regulationDataTable = data.data.Department_Details;
    //   // console.log(this.regulationDataTable);
    //   // console.log(this.regulationDatabyId);
    //   // }
    //   this.regulationDatabyId = data.data;
    //   this.regulationDataTable = data.data.Department_Details;
    //   console.log(this.regulationDataTable);
    //   console.log(this.regulationDatabyId);
    //   // return this.regulationDatabyId;
    // }
    // );
    // return serData;
  }
  getRegulationDataTable(){
    return this.regulationDataTable;
  }
  add(newdata: tableData) {
    var data = {
      "sNo": this.tableDisplayData.length + 1,
      "credits": newdata.credits,
      "subjectCode": newdata.subjectCode,
      "subjectName": newdata.subjectName,
      "shortCode": newdata.subjectCode

    }
    this.tableDisplayData.push(data);
  }
  editData(old: tableData) {
    this.oldData = old;
  }
  afterEdit(changedData: formEditData) {
    this.tableDisplayData[this.rownumber].subjectName = changedData.subjectName;
    this.tableDisplayData[this.rownumber].subjectCode = changedData.subjectCode;
    this.tableDisplayData[this.rownumber].shortCode = changedData.subjectName;
    this.tableDisplayData[this.rownumber].credits = changedData.credits;
  }
  getAddRegData() {
    return this.data = [1];
  }
  postAddRegData(data:any){
  console.log(data);
  console.log(this.instid);
  // const httpOptions = {
  //   headers: new this.HttpHeader({
  //     'Content-Type':  'application/json'
  //   })
  // }
   var a = this.http.post(`${this.uri}/Regulation/newregulations/${this.instid}`,data);
   return a;
  }
  onDelete(){
    var rId = this.RId;
    return this.http.put(`${this.uri}/Regulation/deleteregulation/${this.instid}/${rId}`,"");
  }
  getAddRegTableData(sem) {
    var finalData = [];
    var sub = [];
    // var dep = ["ECE", "CSE", "MECH", "IT" ];
  var dep = this.allDeps;
    
    for (var i = 1; i <= sem; i++) {
      var subobj = { sNo: i, Core: 0, OE: 0, PE: 0};
      sub.push(subobj);
    }
    for(var j=0;j<dep.length;j++){
    var dataobj = {
      Department_ID: dep[j].courseid,
      Department_Name:dep[j].coursename,
      total_Credit:28,
      Semester_Count: sem,
      Credits_Details: sub
    }
    finalData.push(dataobj);
  }
    
    return finalData;
  }
  getAllAsFormArray(Subjects:any){
  
    let nArry=new FormArray([]);
    let arry=Subjects.map((subject: any) => {
      // Maps all the albums into a formGroup defined in
      const fgs = Data.asFormGroup(subject);
      nArry.controls.push(fgs);
      return nArry;
    });
    return nArry;
  }
}
