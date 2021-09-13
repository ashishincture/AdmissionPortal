import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


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
  dataSource;

  uri: string = 'https://university-app-2021.herokuapp.com';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service: DataService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.service.getRegulationDetailsData(this.rid).subscribe((data: any) => {
      this.RegData = data.data.Regulation[0];
      this.tableData = data.data.Regulation[0].Department_Details;
      this.dataSource = this.tableData;
      console.log(this.RegData);
      console.log(this.tableData);
      this.myForm = this.fBuilder.group({
        regulationName: [this.RegData.Regulation_Name, [Validators.required,]],
        regulationId: [this.RegData.Regulation_ID, [Validators.required,]],
        courseName: [this.RegData.Course_Type, [Validators.required,]],
        startyear: [this.RegData.Academic_Start_Year, [Validators.required,]],
        endyear: [this.RegData.Academic_End_Year, [Validators.required,]],
      })
    }
    );

  }

  ngOnInit(): void {
    this.myForm = this.fBuilder.group({
      regulationName: [this.RegData.Regulation_Name, [Validators.required,]],
      regulationId: [this.RegData.Regulation_ID, [Validators.required,]],
      courseName: [this.RegData.Course_Type, [Validators.required,]],
      startyear: [this.RegData.Academic_Start_Year, [Validators.required,]],
      endyear: [this.RegData.Academic_End_Year, [Validators.required,]],
    })
  }
  onClickTable(depId) {
    this.service.getSubjectsbyId(depId);
    console.log(depId);
    this.router.navigate(['departmentdetail']);
  }
  onDeleteReg() {
    this.service.onDelete().subscribe((data: any) => {
      console.log(data);
      if (data.msg === "success") {
        alert("Regulation Deleted Successfully");
        this.router.navigate(['regulation']);
      }
    })
  }
  onUpdateRegDialog() {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '350px',
      data: this.fBuilder.group({
        endyear : this.RegData.Academic_End_Year
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      console.log(result);
      var payload = {
        "Academic_End_Year": result.endyear
      }
      var updateyear = this.http.post(`${this.uri}/Regulation/updateacademicendyear/${this.service.instid}/${this.RegData.Course_Type}/${this.RegData.Regulation_ID}`, payload);
      updateyear.subscribe((data: any) => {
        console.log(data);
        if (data.msg === "sucess") {
          alert("Regulation updated successfully");
        }
      },error=>{
        alert(error.error.error._message);
      });

      this.RegData.Academic_End_Year = result.endyear;
      this.ngOnInit();
      console.log(this.RegData);
    });
  }

}
