import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contributors, SubjectService } from '../subject-service.service'
import { MatDialog } from '@angular/material/dialog';
import { AddContributorDialogComponent } from '../add-contributor-dialog/add-contributor-dialog.component'
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropdownService, Regulation, Department, Semester, Subject, Institutes, CurriculumPayload, Curriculum, SemesterPayload, SubjectPayload, UpdateSubjectParam, EvaluationCriteria } from '../data/apiServiceSkeletonConfigure';
import { RegulationPayload, DepartmentPayload } from '../data/apiServiceSkeletonConfigure';
import { ApiServiceSkeletonDefault, DefaultContributors, DefaultSubject, DefaultSubjectPayload, DefaultSubjectUpdateParam } from '../data/apiServiceSkeletonDefault'

@Component({
  selector: 'app-skeleton-table-configure',
  templateUrl: './skeleton-table-configure.component.html',
  styleUrls: ['./skeleton-table-configure.component.css']
})
export class SkeletonTableConfigureComponent implements OnInit {
  @ViewChild('evaluationCriteriaTable') table!: MatTable<any>;
  // @ViewChild('table') public table: MatTable<any>;
  // @ViewChild(MatTable,{static:gdtrue}) table: MatTable<any>;
  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<any>;
  // semester: Semester[] = [
  //   { num: '1' },
  //   { num: '2' }, 
  //   { num: '3' },
  //   { num: '4' }
  // ];

  /* Selected Values */
  selectedInstitute: string;
  selectedRegulation: string;
  selectedDepartment: string;
  selectedSemester: number;
  selectedCurriculum: string;
  selectedSubject: string;

  Total: number = 0;
  showSno: boolean = false;
  showData: boolean = false;
  hideBranch: boolean = true;
  hideSemester: boolean = true;
  hideSubject: boolean = true;
  displayedColumns: string[] = ['sNo', 'type_of_evaluation', 'total_marks', 'individual_contribution', 'action'];

  displayedColumns2: string[] = ['id', 'subjectName', 'subjectCode', 'subjectType', 'credits', 'assignPattern', 'status'];

  selectedSubjectData: Subject;
  dataSource: Contributors[];
  institutes: Institutes[] = [];
  regulations: Regulation[] = [];
  departments: Department[] = [];
  curriculums: Curriculum[] = [];
  semesters: Semester[] = [];
  subjects: Subject[] = [];
  defaultSubjects: DefaultSubject[] = [];

  selectedPattern: string;

  constructor(public dialog: MatDialog, private _subjectService: SubjectService, private _dropdownService: DropdownService,private _defaultsService: ApiServiceSkeletonDefault,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var that = this;
    this._dropdownService.getInstituteDropdown()
      .subscribe(
        data => {
          if (data.success == true) {
            if (data.insArray.length == 0) {
              that.openSnackBar("No Regulations in Dropdown", "DISPLAY");
            }
            this.institutes = data.insArray;
          } else {
            that.openSnackBar("Error in Retreving Data", "DATA");
          }
        }
      );


      this._defaultsService.getSubjectSkeletonDefaults()
      .subscribe(
        data => {
          debugger;
          that.defaultSubjects = [];
          if (data.msg.toLowerCase() == "success") {
            if (data.data.length == 0) {
              that.openSnackBar("No Default Subject Data Available", "DISPLAY");
            }
            this.defaultSubjects = data.data;
          } else {
            that.openSnackBar("Error in Retreving Data", "ERROR");
          }
        }
      );
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    //     const initialSelection = [];
    // const allowMultiSelect = true;
    // this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  // displayBranch = this.branchList;


  // selectedCourse:number;
  // selectedBranch:string="";
  // selectedSemester:any="";


  getTotal() {
    this.Total = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      this.Total = this.Total + this.dataSource[i].individual_contribution;

    }
  }

  //change of Institute
  onChangeInstitute($event: Event) {
    this.selectedRegulation = null;
    this.selectedDepartment = null;
    this.selectedSemester = null;
    this.selectedCurriculum = null;
    this.selectedSubject = null;
    this.showData = false;
    this.regulations = [];
    this.departments = [];
    this.curriculums = [];
    this.semesters = [];
    this.subjects = [];
    var that = this;
    var payloadForRegulation: RegulationPayload = {
      ins_id: this.selectedInstitute
    }
    this._dropdownService.getRegulationDropdown(payloadForRegulation)
      .subscribe
      (data => {
        for (let i = 0; i < data.length; i++) {
          var regulation: Regulation = {
            instituteId: that.selectedInstitute,
            regulationId: data[i],
            regulationName: data[i]
          };
          that.regulations.push(regulation);
        }
        if (data.length == 0) {
          that.openSnackBar("No Regulations in Dropdown", "DISPLAY");
        }
        if (!data.success) {
          if (data.message) {
            that.openSnackBar(data.message, "DISPLAY");
          }
        }
      }
      );
  }

  //change of Regulation
  onChangeRegulation($event) {
    this.selectedDepartment = null;
    this.selectedSemester = null;
    this.selectedCurriculum = null;
    this.selectedSubject = null;
    this.showData = false;
    this.departments = [];
    this.curriculums = [];
    this.semesters = [];
    this.subjects = [];
    var that = this;
    var payloadForDepartment: DepartmentPayload = {
      ins_id: this.selectedInstitute,
      reg_id: this.selectedRegulation,

    }
    this._dropdownService.getDepartmentDropdown(payloadForDepartment)
      .subscribe
      (data => {
        if (data.msg == "sucess") {
          for (let i = 0; i < data.depArray.length; i++) {
            var department: Department = {
              instituteId: that.selectedInstitute,
              regulationId: this.selectedRegulation,
              departmentId: data.depArray[i].departmentID,
              departmentName: data.depArray[i].departmentName
            };
            that.departments.push(department);
            if (data.depArray.length == 0) {
              that.openSnackBar("No Departments in Dropdown", "DISPLAY");
            }
          }
        } else {
          that.openSnackBar("Error in Retreving Data", "DATA");
        }
      }
      );
  }

  onChangeDepartment($event) {
    this.selectedSemester = null;
    this.selectedCurriculum = null;
    this.selectedSubject = null;
    this.showData = false;
    this.curriculums = [];
    this.semesters = [];
    this.subjects = [];
    var that = this;
    var payloadForCurriculum: CurriculumPayload = {
      ins_id: this.selectedInstitute,
      reg_id: this.selectedRegulation,
      dep_id: this.selectedDepartment
    }
    this._dropdownService.getCurriculumDropdown(payloadForCurriculum)
      .subscribe
      (data => {
        if (data.msg == "sucess") {
          for (let i = 0; i < data.curArray.length; i++) {
            var curriculum: Curriculum = {
              instituteId: that.selectedInstitute,
              regulationId: that.selectedRegulation,
              departmentId: that.selectedRegulation,
              curriculumId: data.curArray[i].Curriculum,
              curriculumName: data.curArray[i].Curriculum
            };
            that.curriculums.push(curriculum);
          }
          if (data.curArray.length == 0) {
            that.openSnackBar("No Curriculums in Dropdown", "DISPLAY");
          }
        } else {
          that.openSnackBar("Error in Retreving Data", "DATA");
        }
      }
      );
  }

  onChangeCurriculum($event) {
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.showData = false;
    this.semesters = [];
    this.subjects = [];
    var that = this;
    var payloadForSemester: SemesterPayload = {
      ins_id: this.selectedInstitute,
      reg_id: this.selectedRegulation,
      dep_id: this.selectedDepartment,
      cur_no: this.selectedCurriculum
    }
    this._dropdownService.getSemesterDropdown(payloadForSemester)
      .subscribe
      (data => {
        if (data.msg == "sucess") {
          for (let i = 0; i < data.semesters.length; i++) {
            var semester: Semester = {
              instituteId: that.selectedInstitute,
              regulationId: that.selectedRegulation,
              departmentId: that.selectedRegulation,
              curriculumId: that.selectedCurriculum,
              semesterNo: data.semesters[i]
            };
            that.semesters.push(semester);
          }
          if (data.semesters.length == 0) {
            that.openSnackBar("No Semesters in Dropdown", "DISPLAY");
          }
        } else {
          that.openSnackBar("Error in Retreving Data", "DATA");
        }
      }
      );
  }

  onChangeSemester($event) {
    debugger;
    this.selectedSubject = null;
    this.showData = false;
    this.subjects = [];
    var that = this;
    var payloadForSubject: SubjectPayload = {
      ins_id: this.selectedInstitute,
      reg_id: this.selectedRegulation,
      dep_id: this.selectedDepartment,
      cur_no: this.selectedCurriculum,
      sem_no: this.selectedSemester.toString(),
    }
    this._dropdownService.getSubjectDropdown(payloadForSubject)
      .subscribe
      (data => {
        if (data.msg == "sucess") {
          that.subjects = data.data.Subjects;
          if (data.data.Subjects.length == 0) {
            that.openSnackBar("No Subjects in Dropdown", "DISPLAY");
          }


        } else {
          that.openSnackBar("Error in Retreving Data", "DATA");
        }
      }
      );
    // this.showData = true;
  }
  onChangeSubject(evt){

  }

  switchSubject() {
    debugger;
    this.showData = true;
    // this.dataSource = [];
    // if (this.selectedSubject) {
    //   this.showData = true;
    //   this.selectedSubjectData = this.subjects.filter((sub) => { return sub.Subject_Code == this.selectedSubject })[0];
    //   if (this.selectedSubjectData.evalCriteria) {
    //     if (this.selectedSubjectData.evalCriteria.subject_contributors) {
    //       this.dataSource = this.selectedSubjectData.evalCriteria.subject_contributors
    //     } else {
    //       this.dataSource = [];
    //     }
    //   }
    //   this.getTotal();
    // } else {
    //   this.openSnackBar("No Data to Display", "DISPLAY");
    // }
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AddContributorDialogComponent, {
      width: '20rem',
      data: obj
    });
    debugger;


    dialogRef.afterClosed().subscribe(result => {
      // debugger;
      if (result.data.type_of_evaluation == "" || result.data.total_marks == null || result.data.individual_contribution== null) {
        this.openSnackBar("Fields cannot be empty!", "DISPLAY");      }
      else {
        if (result.event == 'Update') {
          this.updateRowData(result.data);
        }
        else if (result.event == 'Add') {
          this.addRowData(result.data);
        }
      }

      if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.sNo == row_obj.sNo) {
        value.type_of_evaluation = row_obj.type_of_evaluation;
        value.total_marks = Number(row_obj.total_marks);
        value.individual_contribution = Number(row_obj.individual_contribution);
      }
      return true;
    });

    this.getTotal();
  }

  addRowData(row_obj: any) {
    var currTime = new Date();
    this.dataSource.push({
      sNo: currTime.getTime(),
      type_of_evaluation: row_obj.type_of_evaluation,
      total_marks: Number(row_obj.total_marks),
      individual_contribution: Number(row_obj.individual_contribution)
    });
    this.table.renderRows();
    this.getTotal();

  }

  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.sNo != row_obj.sNo;
    });
    this.getTotal();
  }

  payloadForSubject: EvaluationCriteria;
  contributorPayload: Contributors[] = [];

  onSubmitContributors() {
    var that = this;
    this.contributorPayload = [];
    for (var i = 0; i < this.dataSource.length; i++) {
      var contributorForPayload: Contributors = {
        sNo: i + 1,
        type_of_evaluation: this.dataSource[i].type_of_evaluation,
        total_marks: this.dataSource[i].total_marks,
        individual_contribution: this.dataSource[i].individual_contribution
      }
      this.contributorPayload.push(contributorForPayload);
    }
    this.payloadForSubject = {
      subject_type: this.selectedSubjectData.evalCriteria.subject_type,
      total_marks_subject: this.Total,
      passing_percentage: this.selectedSubjectData.evalCriteria.passing_percentage,
      subject_contributors: this.contributorPayload
    }

    var param: UpdateSubjectParam = {
      ins_id: that.selectedInstitute,
      reg_id: this.selectedRegulation,
      dep_id: this.selectedDepartment,
      cur_no: this.selectedCurriculum,
      sem_no: this.selectedSemester.toString(),
      subject_id: this.selectedSubjectData.Subject_Code
    }

    this._dropdownService.submitSubjectDetails(this.payloadForSubject, param)
      .subscribe
      (data => {
        that.openSnackBar("Succesful", "UPDATE");
        that.onChangeSemester(that.selectedSemester);
        that.selectedSubject = null;
      }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }
}