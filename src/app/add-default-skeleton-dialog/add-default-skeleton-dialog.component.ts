import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-default-skeleton-dialog',
  templateUrl: './add-default-skeleton-dialog.component.html',
  styleUrls: ['./add-default-skeleton-dialog.component.css']
})
export class AddDefaultSkeletonDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  local_data: any;
  minTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDefaultSkeletonDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data) {
    // this.description = data.description
    this.local_data = {...data};
  }

  ngOnInit(): void {
  }

  closeAddDefaultDialog() {
    this.dialogRef.close();
  }

  saveAddDefaultDialog() {
    this.dialogRef.close({data:this.local_data});
  }
}