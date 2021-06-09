import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

export interface subTypes {
  sNo: number;
  Core: number;
  PE: number;
  OE: number
}

@Component({
  selector: 'app-newreg-table',
  templateUrl: './newreg-table.component.html',
  styleUrls: ['./newreg-table.component.css']
})
export class NewregTableComponent implements OnInit {
  @Input() tableSource;
  @Input() depName;
  @Input() semNo;
  @Input() totalCredits;
  form;
  displayedColumns: string[] = ['sNo', 'Core', 'OE', 'PE'];

  DataforAdd = this.DataService.DataAddReg;

  constructor(
    private _formBuilder: FormBuilder,
    private DataService: DataService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Credits_Details: this._formBuilder.array([])
    });
    // this.DataService.getAllAsFormArray(this.tableSource).subscribe(subjects => {
    //   this.form.setControl('subjects', subjects);
    // });
    let forArry = this.DataService.getAllAsFormArray(this.tableSource);
    this.form.setControl('Credits_Details', forArry);
  }
  inputChange(oEvent:any,depname) {
    let tableData = [];
    // debugger;
    let formData = this.form.controls.Credits_Details.controls;
    for (var i = 0; i < formData.length; i++) {
      tableData.push(formData[i].value);
    }
    this.tableSource = tableData;
    // console.log(this.tableSource);
    // console.log(depname);
    // console.log(this.DataforAdd);
    let reqData = this.DataforAdd;
    for(var j=0; j<reqData.length;j++){
      if(reqData[j].Department_ID === depname){
        reqData[j].Credits_Details = this.tableSource;
      }
    }
    console.log(reqData);
    this.DataService.DataAddReg = reqData;
    console.log(this.DataService.DataAddReg);
    console.log("changed");
  }

}
