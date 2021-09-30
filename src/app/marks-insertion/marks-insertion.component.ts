import { DataSource } from '@angular/cdk/table';
import { DialogMarksUploadComponent } from '../dialog-marks-upload/dialog-marks-upload.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ApiMarksUploadService } from './../data/api-marks-upload.service'
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

interface Semester {
  num: string;
}

export interface PeriodicElement {
  name: string;
  id: number;
  max: number;
  assignment: number;
  lab: number;
  theory: number;
  attendance: number;
  total: number;
}

export interface Subj {
  Credits: number
  Description: string
  Group_Name: string
  Subject_Code: string
  Subject_Name: string
  Type: string
  evalCriteria: any
  _id: string
}

@Component({
  selector: 'app-marks-insertion',
  templateUrl: './marks-insertion.component.html',
  styleUrls: ['./marks-insertion.component.css']
})

export class MarksInsertionComponent implements OnInit {
  getDet = true;
  buttonS = true;
  selectedReg: string = "";
  selectedcurriculum: string = "";
  selectedDept: string = "";
  Regulation: any;
  Department: any;
  Curriculum: any;

  panelExpansion = true;

  Faculty: string = "";
  selectedBranch: string = "";
  selectedSemester: any = "";
  selectedSubject: string = "";
  selectedIns: string = "";
  ELEMENT_DATA_Maths: PeriodicElement[] = [];
  displayedColumns: string[] = [];
  myForm: any;
  displayedColumnsjson: any[] = [];
  dataSource: PeriodicElement[] = [];
  semester: Semester[] = [];
  // Branch:branch[]=[];
  Subjects: any= [];

  // Courses:course[]=[];
  // year:yearT[]=[];

  constructor(private _ApiMarksUploadService: ApiMarksUploadService, private fBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  exampleFormControl = new FormControl('');
  title = 'new-Project';
  showPanel = false;
  showPreview = false;
  maxA: number = 0;
  maxAt: number = 0;
  maxL: number = 0;

  maxT: number = 0;
  CourseSel = false;
  file: any;
  payloadDownload :any;
  arrayBuffer: any
  filelist: any
  validate: boolean = false;
  ArrayP: PeriodicElement[] = [];
  subjectC: any[] = [];
  selectedyear:any;
  academicYear:any;
  Subjectheaderpayload:object={};
  payload:object={};
  aSelSubj:any;
  SubjectHeaders:any;
  openDialog() {

    this.panelExpansion = false;
    this.showPreview = false;
    this.displayedColumns = [];
    this.displayedColumns=["ID","NAME"];
    this.payloadDownload={
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept,
      "ins_id": this.selectedIns,
      "sem_no": this.selectedSemester,
      "acad": this.selectedyear,
      "cur_id":this.selectedcurriculum,
      "patternId":this.aSelSubj[0].patternId,
      "sub_code": this.aSelSubj[0].Subject_ID 
  }
    let DialogRef = this.dialog.open(DialogMarksUploadComponent, {
      width: "500px",
      data: { aExcelData: this.ArrayP, payloadD: this.payloadDownload }
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.length == undefined) {
        this.dataSource = result.aExcelData;

        this.SubjectHeaders.forEach(element=>{
          debugger;
          this.displayedColumns.push(element.type_of_evaluation)
        })
        this.showPreview = true;
      }

      else {
        this.dataSource = result;
      }
    });


  }

 
  loadPanel() {
    this.showPanel = true;
    this.panelExpansion = true;
    this.aSelSubj=this.Subjects.filter(row=>{return row.Subject_ID==this.selectedSubject})
    console.log(this.aSelSubj);
    this.Subjectheaderpayload=
    {
      "patternId":this.aSelSubj[0].patternId
    };
  
    this._ApiMarksUploadService.getCompDetails(this.Subjectheaderpayload).subscribe(data=>{
      this.SubjectHeaders=data.subPattern[0].subject_contributors
    } );
  }
  

  Institution: any[] = [];

  ngOnInit(): void {
    let that = this;
    this._ApiMarksUploadService.getInstitutionList().subscribe(data => {
      if (data.success == true) {
        if (data.insArray.length == 0) {
          that.openSnackBar("No Institutions in Dropdown", "OK");
        }
        console.log(data);
        this.Institution = data.insArray;
      }
      else {
        that.openSnackBar("Error in Retreving Data", "OK");
      }

    });
  }

  InsSel = false;
  RegSel = false;
  deptSel = false;
  currSel = false;
  yearSel = false;
  SemSel = false;

  onChangeIns() {
    let that = this;
    this.InsSel = true;
    this.Regulation = [];
    this.payload = {
      "ins_id": this.selectedIns
    }
    this._ApiMarksUploadService.getRegulationList(this.payload).subscribe(data => {
      // if (data.success == true) {
      if (data.length == 0) {
        that.openSnackBar("No Regulations in Dropdown", "OK");
      }
      if (data.length) {
        console.log(data);
        this.Regulation = data;
      }
      // }
      // else {
      // that.openSnackBar("Error in Retreving Data", "OK");
      // }
      if (!data.success) {
        if (data.message) {
          that.openSnackBar(data.message, "OK");
        }
      }
    });

    this.selectedReg = null;
    this.selectedyear = null;
    this.selectedDept = null;
    this.selectedcurriculum = null;
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
  }

  onChangeReg() {
    let that = this;
    this.Department = [];
    this.academicYear=[];
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg
    }; 
    this._ApiMarksUploadService.getAcademicList(this.payload).subscribe(data => {
      // if (data.msg == "sucess") {
      // debugger
      for(let i =data.academicStart;i<=data.academicEnd;i++)
      {
        this.academicYear.push({"year":i});
      }
      // }
      // else {
      //   that.openSnackBar("Error in Retreving Data", "OK");
      // }
    });

    this.selectedDept = null;
    this.selectedcurriculum = null;
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
  }

  onChangeYear(){
    let that = this;
    this.Department = [];
    this.RegSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg
    };
    this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data => {
      if (data.msg == "sucess") {
        if (data.depArray.length == 0) {
          that.openSnackBar("No Departments in Dropdown", "OK");
        }
        console.log(data);
        this.Department = data.depArray;
      }
      else {
        that.openSnackBar("Error in Retreving Data", "OK");
      }
    });

    this.selectedcurriculum = null;
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
  }
  BatchSel = false;

  onChangeDept() {
    let that = this;
    this.Curriculum = [];
    this.deptSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept
    };
    this._ApiMarksUploadService.getCurriculumList(this.payload).subscribe(data => {
      if (data.msg == "sucess") {
        if (data.curArray.length == 0) {
          that.openSnackBar("No Curriculums in Dropdown", "OK");
        }
        console.log(data);
        this.Curriculum = data.curArray;
      }
      else {
        that.openSnackBar("Error in Retreving Data", "OK");
      }
    });
    
    this.selectedcurriculum = null;
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
  }
  BranchSel = false;

  onChangeCurr() {
    let that = this;
    // this.currSel=true;
    this.semester = [];
    this.yearSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept,
      "cur_no": this.selectedcurriculum
    };

    this._ApiMarksUploadService.getSemesterList(this.payload).subscribe(data => {
      if (data.msg == "sucess") {
        if (data.semesters.length == 0) {
          that.openSnackBar("No Semesters in Dropdown", "OK");
        }
        console.log(data);
        this.semester = data.semesters;
      }
      else {
        that.openSnackBar("Error in Retreving Data", "OK");
      }
    });

    this.selectedSemester = null;
    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
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

  onChangeSem() {
    let that = this;
    this.Subjects = [];
    this.SemSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept,
      "cur_no": this.selectedcurriculum,
      "sem_no": this.selectedSemester
    };
    this._ApiMarksUploadService.getSubjectList(this.payload).subscribe(data => {
      if (data.msg == "sucess") {
        if (data.data.Subjects.length == 0) {
          that.openSnackBar("No Subjects in Dropdown", "OK");
        }
        console.log(data.data.Subjects);
        this.Subjects = data.data.Subjects;
      }
      else {
        that.openSnackBar("Error in Retreving Data", "OK");
      }
    });

    this.selectedSubject = null;
    this.fnShowFilterBarOnly();
  }

  onChangeSub() {
    if (this.selectedSubject) {
      this.getDet = false;
    }

    this.fnShowFilterBarOnly();

  }

  uploadData() {
    let that = this;
    this._ApiMarksUploadService.postExcelData(this.dataSource).subscribe(data => {
      console.log(data);
      that.openSnackBar("Marks uploaded successfully!", "OK");
      // alert("Marks uploaded successfully");
    },
      error => {
        that.openSnackBar("Failed To Upload Excel File.", "OK");
        // alert(error);
        console.log(error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2500, panelClass: ['snackBar'] });
  }

  fnShowFilterBarOnly() {
    if (this.showPanel) {
      this.showPanel = false;
    }
    if (this.showPreview) {
      this.showPreview = false;
    }
  }

  fnSetInitialScreen() {

    this.selectedIns = null;
    this.selectedReg = null;
    this.selectedDept = null;
    this.selectedcurriculum = null;
    this.selectedSemester = null;
    this.selectedSubject = null;

    this.showPanel = false;
    this.showPreview = false;

    //called initially & after successful Excel Upload
  }

  fnCheckExcelMarks() {

    //1st check marking criteria(columns)
    // then check for max-marks validation 

  }


}
