import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

export interface tableData {
  sNo: number;
  subjectName:string;
  subjectCode:string;
  shortCode:string;
  credits:number;
}
export interface formEditData {
  subjectName:string;
  subjectCode:string;
  shortCode:string;
  credits:number;
}

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  myEditForm;
  mytableData=this.service.oldData;
  form: FormGroup;
  formfield: MatFormFieldModule;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service:DataService
  ) { }

  ngOnInit(): void {
    this.myEditForm = this.fBuilder.group({
      subjectName: [this.mytableData.subjectName, [Validators.required,]],
      subjectCode: [this.mytableData.subjectCode, [Validators.required,]],
      shortCode: [this.mytableData.shortCode, [Validators.required,]],
      credits: [this.mytableData.credits, [Validators.required,]]
    })
  }
  onSaveEditedDetails() {
    this.service.afterEdit(this.myEditForm.value);
    this.router.navigate(['departmentdetail']);
  }
  onCancelEdit(){
    this.router.navigate(['departmentdetail']);
  }

}
