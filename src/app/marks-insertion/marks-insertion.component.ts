// import { PeriodicElement } from './../data/dataStr';
import { DataSource } from '@angular/cdk/table';
import { DialogMarksUploadComponent } from '../dialog-marks-upload/dialog-marks-upload.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {ApiMarksUploadService} from './../data/api-marks-upload.service'
import { FormGroup, FormControl,FormBuilder,Validators,AbstractControl,FormArray } from '@angular/forms';

  interface Semester {
    num: string; 
  }
  export interface PeriodicElement {​​​​​​​​
    name: string;
    id: number;
    max:number;
    assignment: number;
    lab:number;
    theory: number;
    attendance: number;
    total: number;
    }​​​​​​​​

export interface Subj{
    Credits: number
Description: string
Group_Name: string
Subject_Code: string
Subject_Name: string
Type: string
evalCriteria : any
_id :string
}
@Component({
  selector: 'app-marks-insertion',
  templateUrl: './marks-insertion.component.html',
  styleUrls: ['./marks-insertion.component.css']
})
export class MarksInsertionComponent implements OnInit {
  getDet=true;
  buttonS=true;
  selectedReg:string="";
  selectedcurriculum:string="";
  selectedDept:string="";
  Regulation:any;
  Department:any;
  Curriculum:any;

  panelExpansion=true;

  Faculty:string="";
  selectedYear:string="";
  selectedBranch:string="";
  selectedSemester:any="";
  selectedSubject:string="";
  selectedIns:string="";
  ELEMENT_DATA_Maths:PeriodicElement[]=[];
  displayedColumns:string[]=[];
  myForm:any;
  displayedColumnsjson:any[]=[];
  dataSource:PeriodicElement[]=[];
  semester: Semester[] = [];
  // Branch:branch[]=[];
  Subjects:Subj[]=[];
  displayedColumnsnew=["id","name","assignment","theory","lab"];
  dataSourcenew=[
    {"id": 1401, "name": "Rohita", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1402, "name": "Harshita","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1403, "name": "Bhargav","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1404, "name": "Nourin","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1405, "name": "Sweety", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1406, "name": "Nivetha","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1407, "name": "Darshan", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1408, "name": "Dikshanth","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
    {"id": 1409, "name": "Smruthi", "max":30,"assignment": 0, "lab":0,  "theory": 0, "attendance":0, "total":0},
    {"id": 1410, "name": "Gayatri", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0,"total":0}
  ];
  maxCol=[ {'columnName':'assignment','maxMarks':30}, {'columnName':'theory','maxMarks':60}, {'columnName':'lab','maxMarks':10}]; 
  // Courses:course[]=[];
  // year:yearT[]=[];
  constructor(private _ApiMarksUploadService:ApiMarksUploadService,private fBuilder:FormBuilder,public dialog: MatDialog){}
  exampleFormControl = new FormControl('');
  title = 'new-Project';
  subB=false;
  maxA:number=0;
  maxAt:number=0;
  hidePanel=false;
  maxL:number=0;
 
  maxT:number=0;
  CourseSel=false;
  file:any;
  payloadDownload={"CourseName":"BTech", "AcademicYear":"2019-2020", "BranchName":"ComputerScience", "Semester":"1", "SubjectName":"Maths"}
  arrayBuffer:any
  filelist:any
  validate:boolean=false;
  ArrayP:PeriodicElement[]= [];
  subjectC:any[]=[];
  openDialog() {

    this.panelExpansion=false;

    this.displayedColumns=[];
    this.displayedColumns=["ID","NAME"];
    let DialogRef=this.dialog.open(DialogMarksUploadComponent,{
      width:"500px",
      data: {arrayP: this.ArrayP,payloadD:this.payloadDownload}
    });
    DialogRef.afterClosed().subscribe(result=> {console.log(result);
    if(result.length==undefined)
    {
      this.dataSource=result.arrayP;
     
      this.Subjects.forEach(element => {
        if(element.Subject_Code===this.selectedSubject)
        {
          
          this.subjectC=element.evalCriteria.subject_contributors
          console.log(this.subjectC)
        }
      });
      this.subjectC.forEach(element=>{
        this.displayedColumns.push(element.type_of_evaluation)
      })
      this.subB=true;
    }
    else{
      this.dataSource=result;
    }
      // debugger
      
    });
    // if(this.dataSource.length!=0)
    // {
      
    // }
    // this.displayedColumnsjson =  this._ApiMarksUploadService.getColumnsMaths();
    //   this.displayedColumnsjson.forEach(element => {
    //     if(element.columnName=="assignment")
    //     {
    //       this.maxA=element.maxMarks;
    //     }
    //     if(element.columnName=="attendance")
    //     {
    //       this.maxAt=element.maxMarks;
    //     }
    //     if(element.columnName=="lab")
    //     {
    //       this.maxL=element.maxMarks;
    //     }
    //     if(element.columnName=="theory")
    //     {
    //       this.maxT=element.maxMarks;
    //     }
    //     this.displayedColumns.push(element.columnName);

    //   }); 
    
  }
  payload:object={};
  loadPanel(){
    this.hidePanel=true;
    this.payload={
    
      "dept_id": "1",
      "course_id": "1",
      "ins_id": "1",
      "sem_id": "1",
      "sub_id": "1",
      "acad_year": "2021"
      
  };
  
    this._ApiMarksUploadService.getCompDetails(this.payload).subscribe(data=>{
      console.log(data);
      this.Faculty=data.facultyName;
    } );
    console.log(this.Faculty);
  }
    
  loadTable()
  {
    this.displayedColumns=[];
    this.subB=true;
    this.buttonS=false;
    if(this.selectedSubject=="Cyber Security")
    {
      this.ELEMENT_DATA_Maths=this._ApiMarksUploadService.getStudentsL();
      
      
      this.displayedColumnsjson =  this._ApiMarksUploadService.getColumnsMaths();
      
      this.displayedColumnsjson.forEach(element => {
        if(element.columnName=="assignment")
        {
          this.maxA=element.maxMarks;
        }
        if(element.columnName=="attendance")
        {
          this.maxAt=element.maxMarks;
        }
        if(element.columnName=="lab")
        {
          this.maxL=element.maxMarks;
        }
        if(element.columnName=="theory")
        {
          this.maxT=element.maxMarks;
        }
        this.displayedColumns.push(element.columnName);

      });
      this.dataSource = this.ELEMENT_DATA_Maths;
    }
    if(this.selectedSubject=="Computer Graphics")
    {
      
      this.ELEMENT_DATA_Maths=this._ApiMarksUploadService.getStudentsL();
      this.dataSource = this.ELEMENT_DATA_Maths;
      this.displayedColumnsjson =  this._ApiMarksUploadService.getColumnsScience();
      this.displayedColumnsjson.forEach(element => {
        // if(element.columnName=="assignment")
        // {
        //   this.maxA=element.maxMarks;
        // }
        // if(element.columnName=="attendance")
        // {
        //   this.maxAt=element.maxMarks;
        // }
        // if(element.columnName=="lab")
        // {
        //   this.maxL=element.maxMarks;
        // }
        // if(element.columnName=="theory")
        // {
        //   this.maxT=element.maxMarks;
        // }
        this.displayedColumns.push(element.columnName);

      });
      this.displayedColumns.forEach(element=>{
        this.displayedColumnsjson.forEach(elementJson=>{
          if(element==elementJson.columnName)
          {
            
          }
        })
      })
    }
    
  }
 
  
  updateTotal(att:Number,theory:Number,assign:Number,lab:Number)
  {
      
    
      
  }
  funAs(element:Number)
  {
    if(element > this.maxA){
      this.buttonS=false;
      return true;
    }
    else{
      this.buttonS=true;
      return false;
    }
  }
  sw="";
   max=0;
  genTotal(){
    this.maxCol.forEach(element=>{
      
      this.sw=element.columnName;
      this.max=element.maxMarks;
      this.dataSourcenew.forEach(elementjson=>{
         
          
      })
    })
    // this.dataSource.forEach(element =>
    // {
      
    //   element.total=element.attendance+element.theory+element.assignment+element.lab;
    //   console.log(element.total);
    // });
    console.log(this.dataSource);
  }
  addfile(event:any) {  
    
    this.subB=true;
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
              // this.filelist = [];    
              // console.log(this.filelist);
        // this.ELEMENT_DATA = XLSX.utils.sheet_to_json(worksheet,{raw:true});    
        this.dataSource = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
        // this.displayTable = true;
  
    }    
  }  
  Institution:any[]=[]
  
  ngOnInit(): void {
    this._ApiMarksUploadService.getInstitutionList().subscribe(data=>{
      console.log(data);
      this.Institution=data.insArray;
    } );
    
    
  }
  InsSel=false;
  RegSel=false;
  deptSel=false;
  currSel=false;
  yearSel=false;
  SemSel=false;
  onChangeIns(){
    this.InsSel=true
    this.payload={    
      "ins_id": this.selectedIns
    }
    this._ApiMarksUploadService.getRegulationList(this.payload).subscribe(data=>{
      console.log(data);
      this.Regulation=data;
    } );
  }
  onChangeReg(){
    this.Department=[];
    this.RegSel=true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg
    }; 
    this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data=>{
      console.log(data);
      this.Department=data.depArray;
    } );
    this.Curriculum=[];
    this.semester=[];
    this.Subjects=[];
  }
  BatchSel=false;
  onChangeDept()
  {
    this.Curriculum=[];
    this.deptSel=true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept
    }; 
    this._ApiMarksUploadService.getCurriculumList(this.payload).subscribe(data=>{
      console.log(data);
      this.Curriculum=data.curArray;
    } );
    this.semester=[];
    this.Subjects=[];
  }
  BranchSel=false;
  onChangeCurr()
  {
    // this.currSel=true;
    this.semester=[];
    this.yearSel=true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept,
      "cur_no":this.selectedcurriculum
    }; 
   
    this._ApiMarksUploadService.getSemesterList(this.payload).subscribe(data=>{
      console.log(data);
      this.semester=data.semesters;
    } );
   
    this.Subjects=[];
  }
  // onChangeYear(){
  //   this.yearSel=true;
  //   this.payload = {
  //     "ins_id": "IN0010",
  //     "reg_id": this.selectedReg
  //   }; 
  //   this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data=>{
  //     console.log(data);
  //     this.Department=data;
  //   } );
  // }
  
  onChangeSem()
  {
    this.Subjects=[];
    this.SemSel=true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept,
      "cur_no":this.selectedcurriculum,
      "sem_no":this.selectedSemester
    }; 
    this._ApiMarksUploadService.getSubjectList(this.payload).subscribe(data=>{
      console.log(data.data.Subjects);
      this.Subjects=data.data.Subjects;
    } );
  }
  onChangeSub()
  {
    // this.RegSel=true;
    // this.payload = {
    //   "ins_id": "IN0010",
    //   "reg_id": selectedReg
    // }; 
    // this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data=>{
    //   console.log(data);
    //   this.Department=data;
    // } );
    if(this.selectedSubject){
      this.getDet=false;
    }
    
  }
  

}
