import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray,ReactiveFormsModule } from '@angular/forms';
import { CRSubjectClass } from '../../data-service.service';

@Component({
  selector: 'app-subj-dialog',
  templateUrl: './subj-dialog.component.html',
  styleUrls: ['./subj-dialog.component.css']
})
export class SubjDialogComponent implements OnInit {
  @ViewChild('subjList',{static:false}) list: any;
  rowData: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubjDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.rowData = data;
     }

  ngOnInit(): void {
  }
  saveSub(){
    
    let selectedsubs=[];
    let selected=this.list.selectedOptions.selected;
    for(var i=0;i<selected.length;i++){
      let item=selected[i].__ngContext__[8].$implicit;
      let obj={
        Subject_Code:item.Subject_ID,
        Subject_Name:item.Subject_Name,
        Type:item.Type,
        Credits:item.Credit,
        Description:"",
        Group_Name:""
      }
      selectedsubs.push(obj);
    }
    this.dialogRef.close(selectedsubs);
  }
  cancelDiag(){
    this.dialogRef.close();
  }

}
