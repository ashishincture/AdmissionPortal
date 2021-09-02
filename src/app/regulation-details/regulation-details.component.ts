import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-regulation-details',
  templateUrl: './regulation-details.component.html',
  styleUrls: ['./regulation-details.component.css']
})
export class RegulationDetailsComponent implements OnInit {
  myForm;
  form: FormGroup;
  formfield: MatFormFieldModule;
  rid = this.service.RId;
  RegData;
  tableData;
  // RegData = this.service.getRegulationDetailsData(this.rid);
  // tableData = this.service.getRegulationDataTable();
  displayedColumns: string[] = ['semNo', 'core', 'pe', 'oe'];
  dataSource ;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service:DataService) {
      this.service.getRegulationDetailsData(this.rid).subscribe((data: any) => {
        this.RegData = data.data.Regulation[0];
        this.tableData = data.data.Regulation[0].Department_Details;
        this.dataSource=this.tableData;
        console.log(this.RegData);
        console.log(this.tableData);
        this.myForm = this.fBuilder.group({
          regulationName: [this.RegData.Regulation_Name, [Validators.required,]],
          regulationId: [this.RegData.Regulation_ID, [Validators.required,]],
          courseName:[this.RegData.Course_Type, [Validators.required,]],
          // subType: ['', [Validators.required,]],
          // gradeType: ['', [Validators.required,]]
        })
      }
      );

     }

  ngOnInit(): void {
    console.log(this.RegData);
    this.myForm = this.fBuilder.group({
      regulationName: [this.RegData.Regulation_Name, [Validators.required,]],
      regulationId: [this.RegData.Regulation_ID, [Validators.required,]],
      // subType: ['', [Validators.required,]],
      // gradeType: ['', [Validators.required,]]
    })
  }
  onClickTable(depId) {
    this.service.getSubjectsbyId(depId);
    console.log(depId);
    this.router.navigate(['departmentdetail']);
  }
  onDeleteReg(){
    this.service.onDelete().subscribe((data:any)=>{
      console.log(data);
      if(data.msg === "success"){
        alert("Regulation Deleted Successfully");
        this.router.navigate(['regulation']);
      }
    })
  }

}
