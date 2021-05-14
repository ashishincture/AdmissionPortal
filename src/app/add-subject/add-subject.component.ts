import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

export interface tableData {
  sNo: number;
  subjectName: string;
  subjectCode: string;
  shortCode: string;
  credits: number;
}

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  myForm;
  departmentName = "";
  hodName = "";
  form: FormGroup;
  formfield: MatFormFieldModule;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service: DataService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fBuilder.group({
      subjectName: ['', [Validators.required,]],
      subjectCode: ['', [Validators.required,]],
      type: ['', [Validators.required,]],
      credits: ['', [Validators.required,]]
    })
  }
  onSaveSubjectDetails() {
    console.log(this.myForm.value);
    this.service.add(this.myForm.value);

    this.myForm.reset();
    this.router.navigate(['departmentdetail']);
  }
  onCancelAdd(){
    this.router.navigate(['departmentdetail']);
  }

}
