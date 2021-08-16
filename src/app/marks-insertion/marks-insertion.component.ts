import { DataSource } from '@angular/cdk/table';
import { DialogMarksUploadComponent } from '../dialog-marks-upload/dialog-marks-upload.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
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
  selectedYear: string = "";
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
  Subjects: Subj[] = [];

  // Courses:course[]=[];
  // year:yearT[]=[];

  constructor(private _ApiMarksUploadService: ApiMarksUploadService, private fBuilder: FormBuilder, public dialog: MatDialog) { }
  exampleFormControl = new FormControl('');
  title = 'new-Project';
  showPreview = false;
  maxA: number = 0;
  maxAt: number = 0;
  showPanel = false;
  maxL: number = 0;

  maxT: number = 0;
  CourseSel = false;
  file: any;
  payloadDownload = { "CourseName": "BTech", "AcademicYear": "2019-2020", "BranchName": "ComputerScience", "Semester": "1", "SubjectName": "Maths" }
  arrayBuffer: any
  filelist: any
  validate: boolean = false;
  ArrayP: PeriodicElement[] = [];
  subjectC: any[] = [];

  openDialog() {

    this.panelExpansion = false;
    this.showPreview = false;
    this.displayedColumns = [];

    let DialogRef = this.dialog.open(DialogMarksUploadComponent, {
      width: "500px",
      data: { aExcelData: this.ArrayP, payloadD: this.payloadDownload }
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.length == undefined) {
        this.dataSource = result.aExcelData;

        this.Subjects.forEach(element => {
          if (element.Subject_Code === this.selectedSubject) {

            this.subjectC = element.evalCriteria.subject_contributors
            console.log(this.subjectC)
          }
        });
        this.subjectC.forEach(element => {
          this.displayedColumns.push(element.type_of_evaluation)
        })
        this.showPreview = true;
      }

      else {
        this.dataSource = result;
      }
    });


  }

  payload: object = {};

  loadPanel() {
    this.showPanel = true;
    this.panelExpansion = true;
    this.payload = {

      "dept_id": "1",
      "course_id": "1",
      "ins_id": "1",
      "sem_id": "1",
      "sub_id": "1",
      "acad_year": "2021"

    };

    this._ApiMarksUploadService.getCompDetails(this.payload).subscribe(data => {
      console.log(data);
      this.Faculty = data.facultyName;
    });
    console.log(this.Faculty);
  }


  // funAs(element:Number)
  // {
  //   if(element > this.maxA){
  //     this.buttonS=false;
  //     return true;
  //   }
  //   else{
  //     this.buttonS=true;
  //     return false;
  //   }
  // }
  sw = "";
  max = 0;

  Institution: any[] = []

  ngOnInit(): void {
    this._ApiMarksUploadService.getInstitutionList().subscribe(data => {
      console.log(data);
      this.Institution = data.insArray;
    });
  }

  InsSel = false;
  RegSel = false;
  deptSel = false;
  currSel = false;
  yearSel = false;
  SemSel = false;

  onChangeIns() {
    this.InsSel = true
    this.payload = {
      "ins_id": this.selectedIns
    }
    this._ApiMarksUploadService.getRegulationList(this.payload).subscribe(data => {
      console.log(data);
      this.Regulation = data;
    });
  }

  onChangeReg() {
    this.Department = [];
    this.RegSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg
    };
    this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data => {
      console.log(data);
      this.Department = data.depArray;
    });
    this.Curriculum = [];
    this.semester = [];
    this.Subjects = [];
  }

  BatchSel = false;

  onChangeDept() {
    this.Curriculum = [];
    this.deptSel = true;
    this.payload = {
      "ins_id": this.selectedIns,
      "reg_id": this.selectedReg,
      "dep_id": this.selectedDept
    };
    this._ApiMarksUploadService.getCurriculumList(this.payload).subscribe(data => {
      console.log(data);
      this.Curriculum = data.curArray;
    });
    this.semester = [];
    this.Subjects = [];
  }
  BranchSel = false;

  onChangeCurr() {
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
      console.log(data);
      this.semester = data.semesters;
    });

    this.Subjects = [];
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
      console.log(data.data.Subjects);
      this.Subjects = data.data.Subjects;
    });
  }

  onChangeSub() {
    // this.RegSel=true;
    // this.payload = {
    //   "ins_id": "IN0010",
    //   "reg_id": selectedReg
    // }; 
    // this._ApiMarksUploadService.getDepartmentList(this.payload).subscribe(data=>{
    //   console.log(data);
    //   this.Department=data;
    // } );
    if (this.selectedSubject) {
      this.getDet = false;
    }

  }

  uploadData() {

    this._ApiMarksUploadService.postExcelData(this.dataSource).subscribe(data => {
      console.log(data);
      alert("Marks uploaded successfully");
    },
      error => alert(error));
  }


}
