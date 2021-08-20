import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Contributors {
  sNo: number;
  type_of_evaluation: string;
  total_marks: number;
  individual_contribution: number;
}

@Component({
  selector: 'app-add-contributor-dialog',
  templateUrl: './add-contributor-dialog.component.html',
  styleUrls: ['./add-contributor-dialog.component.css']
})
export class AddContributorDialogComponent implements OnInit {
  
  action:string;
  local_data:any;
  minTotal: number = 0;
  minIndContrib: number = 0;
  constructor(public dialogRef: MatDialogRef<AddContributorDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Contributors) {
    this.local_data = {...data};
    this.action = this.local_data.action;
   }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
