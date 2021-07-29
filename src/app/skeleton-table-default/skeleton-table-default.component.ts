import { Component, OnInit, ViewChild } from '@angular/core';
import *  as  data from '../data/subjectTypeData.json';
import { Contributors, SubjectService } from '../subject-service.service'
import { MatDialog } from '@angular/material/dialog';
import { AddContributorDialogComponent } from '../add-contributor-dialog/add-contributor-dialog.component'
import { MatTable } from '@angular/material/table';
import { ApiServiceSkeletonDefault, DefaultContributors, DefaultSubject, DefaultSubjectPayload, DefaultSubjectUpdateParam, NewDefaultSubjectPayload } from '../data/apiServiceSkeletonDefault'
import { MatSnackBar } from '@angular/material/snack-bar';
import { isThisQuarter } from 'date-fns/esm';


import {​​​ MatDialogConfig }​​​ from'@angular/material/dialog';
import {​​​ AddDefaultSkeletonDialogComponent }​​​ from'../add-default-skeleton-dialog/add-default-skeleton-dialog.component';


// export interface Contributors {
//   sNo: number;
//   type_of_evaluation: string;
//   total_marks: number;
//   individual_contribution: number;
// }

// export interface subjectTypeMetadata {
//   subject_type: string,
//   total_marks_subject: number,
//   passing_percentage: number,
//   subject_contributors: Contributors[]
// }

// const SUBS_METADATA: subjectTypeMetadata[] = (data as any).default;

@Component({
  selector: 'app-skeleton-table-default',
  templateUrl: './skeleton-table-default.component.html',
  styleUrls: ['./skeleton-table-default.component.css']
})
export class SkeletonTableDefaultComponent implements OnInit {

  @ViewChild('evaluationCriteriaTable') table!: MatTable<any>;

  constructor(public dialog: MatDialog, private _subjectService: SubjectService, private _defaultsService: ApiServiceSkeletonDefault, private _snackBar: MatSnackBar) { }

  defaultSubjects: DefaultSubject[] = [];
  showDefaultSubjectData: boolean = false;
  displayedColumns: string[] = ['type_of_evaluation', 'total_marks', 'individual_contribution', 'action'];
  selectedSubjectData: DefaultSubject = null;
  dataSource: DefaultContributors[] = null;
  selectedSubject: string = null;
  Total: number = 0;

  ngOnInit(): void {
    var that = this;
    this._defaultsService.getSubjectSkeletonDefaults()
      .subscribe(
        data => {
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
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }

  getTotal() {
    this.Total = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      this.Total = this.Total + this.dataSource[i].individual_contribution;
    }
  }

  openDialog(action: any, obj: any) {
    console.log(this._subjectService.getSubjects())
    obj.action = action;
    const dialogRef = this.dialog.open(AddContributorDialogComponent, {
      width: '20rem',
      data: obj
    });
    debugger;
    dialogRef.afterClosed().subscribe(result => {
      if (result.data.type_of_evaluation == "" || result.data.total_marks == null || result.data.individual_contribution == null) {
        this.openSnackBar("Fields cannot be empty!", "DISPLAY");
      }
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
    var id = this.dataSource.length + 1;
    this.dataSource.push({
      _id: (new Date().getTime().toString()),
      sNo: id,
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

  onChangeType(evt) {
    this.selectedSubjectData = this.defaultSubjects.filter((sub) => { return sub.subject_type == this.selectedSubject })[0];

    this.dataSource = this.selectedSubjectData.subject_contributors;
    this.getTotal();

    this.dataSource = [];
    if (this.selectedSubject) {
      this.showDefaultSubjectData = true;
      this.selectedSubjectData = this.defaultSubjects.filter((sub) => { return sub.subject_type == this.selectedSubject })[0];
      if (this.selectedSubjectData.subject_contributors) {
        this.dataSource = this.selectedSubjectData.subject_contributors
      } else {
        this.dataSource = [];
      }
      this.getTotal();
    } else {
      this.openSnackBar("No Data to Display", "DISPLAY");
    }
  }

  onAddPattern(){

  }

  payloadForDefaultSubjectUpdate: DefaultSubjectPayload;
  contributorPayload: Contributors[] = [];

  onSubmitData() {
    debugger;
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

    this.payloadForDefaultSubjectUpdate = {
      _id: this.selectedSubjectData._id,
      subject_type: this.selectedSubjectData.subject_type,
      total_marks_subject: this.Total,
      passing_percentage: this.selectedSubjectData.passing_percentage,
      subject_contributors: this.contributorPayload,
      __v: this.selectedSubjectData.__v
    }

    var param: DefaultSubjectUpdateParam = {
      subject_type: this.selectedSubject
    }

    this._defaultsService.updateSubjectDefaultSkeleton(this.payloadForDefaultSubjectUpdate, param)
      .subscribe
      (data => {
        that.openSnackBar(data.msg, "UPDATE");
        that.selectedSubject = null;
        that.showDefaultSubjectData = false;
        that._defaultsService.getSubjectSkeletonDefaults()
          .subscribe(
            data => {
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
      }
      );
  }

  onAddNewDefault() {
    debugger;
    const addDefaultDialogConfig = new MatDialogConfig();
    var that = this;
    addDefaultDialogConfig.disableClose = true;
    addDefaultDialogConfig.autoFocus = true;
    addDefaultDialogConfig.width = "20rem";
    addDefaultDialogConfig.data = {};
    const dialogRef = this.dialog.open(AddDefaultSkeletonDialogComponent, addDefaultDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (!result.data.pattern_name || !result.data.passing_percentage) {
        this.openSnackBar("Fields cannot be empty!", "DISPLAY");
      }
      else {
        var payload:NewDefaultSubjectPayload = {
          subject_type: result.data.pattern_name,
          subject_contributors: [],
          total_marks_subject:  0,
          passing_percentage: result.data.passing_percentage
        }
        this._defaultsService.addSubjectDefaultSkeleton(payload)
      .subscribe
      (data => {
        that.openSnackBar(data.msg, "UPDATE");
        that.selectedSubject = null;
        that.showDefaultSubjectData = false;
        that._defaultsService.getSubjectSkeletonDefaults()
          .subscribe(
            data => {
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
      }
      );
      }
    });
  }
}




