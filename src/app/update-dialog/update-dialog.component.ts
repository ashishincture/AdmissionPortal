import { Component, OnInit,Inject } from '@angular/core';
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
      private dialogRef: MatDialogRef<UpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
      ) { }
  
    ngOnInit(): void {
      if(!this.data)
    { this.createForm();}
    else{
      this.myForm = this.fBuilder.group({
        Subject_ID: [this.data.Subject_ID,[Validators.required]],
      Subject_Name:  [this.data.Subject_Name,[Validators.required]],
      isActive: [true,[Validators.required]],
      Type: [this.data.Type,[Validators.required]],
      Department_ID: [this.data.Department_ID,[Validators.required]],
      Regulation_ID: [this.data.Regulation_ID,[Validators.required]],
      Credit: [this.data.Credit,[Validators.required]],
      });
    }
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
      if(this.data){
        this.dialogRef.close({ data: this.myForm.value, edited:true });
      }
      else{
        this.dialogRef.close({ data: this.myForm.value });
      }
      // var data = this.myForm.value;
      this.myForm.reset();
    }
  }
  