import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

export interface subTypes {
  sNo: number;
  Core: number;
  PE: number;
  OE: number
}

export interface regulationDetails {
  depName: string;
  sem: number;
  totalCredits: number;
  subjects: subTypes[]
}

@Component({
  selector: 'app-regulation-details',
  templateUrl: './regulation-details.component.html',
  styleUrls: ['./regulation-details.component.css']
})
export class RegulationDetailsComponent implements OnInit {
  myForm;
  form: FormGroup;
  formfield: MatFormFieldModule;
  tableData = this.service.getRegulationDetailsData();
  displayedColumns: string[] = ['semNo', 'core', 'pe', 'oe'];
  dataSource = this.tableData;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service:DataService) { }

  ngOnInit(): void {
    this.myForm = this.fBuilder.group({
      regulationName: ['', [Validators.required,]],
      regulationId: ['', [Validators.required,]],
      subType: ['', [Validators.required,]],
      gradeType: ['', [Validators.required,]]
    })
  }
  onClickTable() {
    this.router.navigate(['departmentdetail']);
  }

}
