import { Component, OnInit,inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface Subject{
  Subject_ID: string;
  Subject_Name: string;
  isActive:boolean;
  Type:string;
  Department_ID:string;
  Regulation_ID:string;
  Credit:string;
}
@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  sub:Subject={
    Subject_ID: "",
    Subject_Name: "",
    isActive:false,
    Type:"",
    Department_ID:"",
    Regulation_ID:"",
    Credit:"",
  };
    myForm:any;
    constructor(
      private fBuilder: FormBuilder,
      private dialogRef: MatDialogRef<UpdateDialogComponent>
    ) { this.createForm();}
  
    ngOnInit(): void {
    }
    createForm(): void {
      this.myForm = this.fBuilder.group({
        Subject_ID: ['',[Validators.required]],
      Subject_Name:  ['',[Validators.required]],
      isActive: [true,[Validators.required]],
      Type: ['',[Validators.required]],
      Department_ID: ['',[Validators.required]],
      Regulation_ID: ['R2',[Validators.required]],
      Credit: ['',[Validators.required]],
      });
    }
    onSubmit(): any {
      var data = this.myForm.value;
      this.dialogRef.close({ data: this.myForm.value });
      this.myForm.reset();
    }
  }
  