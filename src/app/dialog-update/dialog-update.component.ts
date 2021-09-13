import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css']
})
export class DialogUpdateComponent implements OnInit {
  form: FormGroup;
  regData;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.regData = data;
  }

  ngOnInit(): void {
    console.log(this.regData);
    this.form = this.fb.group({
      endyear: [this.regData.value.endyear]
    });
  }

  close() {
    this.dialogRef.close();
  }
  onUpdate() {
    console.log("update");
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

}
