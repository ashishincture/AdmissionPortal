import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { NewregTableComponent } from '../newreg-table/newreg-table.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGradingComponent } from '../dialog-grading/dialog-grading.component';

export interface subTypes {
  sNo: number;
  Core: number;
  PE: number;
  OE: number
}


@Component({
  selector: 'app-new-regulation',
  templateUrl: './new-regulation.component.html',
  styleUrls: ['./new-regulation.component.css']
})
export class NewRegulationComponent implements OnInit {
  myForm;
  myTable;
  form: FormGroup;
  formfield: MatFormFieldModule;
  rid = this.service.RId;
  tableData = this.service.getRegulationDetailsData(this.rid);
  tableRow = [1, 2, 3, 4, 5];
  tableVisibility = true;
  eflag = this.service.eidtFlag;

  courses;
  selectedCourse;

  displayedColumns: string[] = ['semNo', 'core', 'pe', 'oe'];
  dataSource;
  uri: string = 'https://university-app-2021.herokuapp.com';
  // instid = "IN0010";

  data1 = null;
  data2 = {
    GradeType: "Points_Grade_Percentage_Description",
    RangeLow: 9,
    RangeHigh: 10,
    GradingDetails: [
      {
        points: 10,
        grade: "S",
        description: "Excellent",
        percentage: 95,
        rangeHigh : 100,
        rangeLow : 90

      },
      {
        points: 9,
        grade: "A",
        description: "Very Good",
        percentage: 85,
        rangeHigh : 89,
        rangeLow : 80
      },
      {
        points: 8,
        grade: "B",
        description: "Good",
        percentage: 75,
        rangeHigh : 79,
        rangeLow : 70
      },
      {
        points: 7,
        grade: "C",
        description: "Poor Performance",
        percentage: 65,
        rangeHigh : 69,
        rangeLow : 60
      },
      {
        points: 6,
        grade: "D",
        description: "Just Pass",
        percentage: 55,
        rangeHigh : 59,
        rangeLow : 35
      },
      {
        points: 5,
        grade: "F",
        description: "Fail",
        percentage: 43,
        rangeHigh : 34,
        rangeLow : 0
      }
    ]
  };

  @ViewChild('tableId', { read: ViewContainerRef, static: false })

  container!: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service: DataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.service.getCourseList().subscribe((data: any) => {
      this.courses = data;
    },error=>{
      alert(error.error.error._message);
    });
   }

  ngOnInit(): void {
    if (this.eflag === true) {
      this.myForm = this.fBuilder.group({
        regulationName: ['', [Validators.required,]],
        regulationId: ['', [Validators.required,]],
        semesters: [3, [Validators.required,]],
        academicyear: [2020, [Validators.required,]],
        gradeType: ["Grading", [Validators.required,]]
      })
      this.onConfirm();
    }
    else {
      this.myForm = this.fBuilder.group({
        regulationName: ['', [Validators.required,]],
        regulationId: ['', [Validators.required,]],
        semesters: ['', [Validators.required,]],
        academicyear: ['', [Validators.required,]],
        gradeType: ['', [Validators.required,]]
      })
    }
  }
  onConfirm() {
    // var curData = this.tableRow;
    // curData.push(this.tableRow.length+1);
    // this.service.data=curData;
    console.log(this.selectedCourse);
    this.tableVisibility = false;
    // debugger;
    this.dataSource = this.service.getAddRegTableData(this.myForm.value.semesters);

    this.service.DataAddReg = this.dataSource;
    for (var i = 0; i < this.dataSource.length; i++) {

      let crViewfactory = this.componentFactoryResolver.resolveComponentFactory(NewregTableComponent);
      let panel = this.container.createComponent(crViewfactory);
      panel.instance.tableSource = this.dataSource[i].Credits_Details;
      panel.instance.depName = this.dataSource[i].Department_Name;
      panel.instance.semNo = this.dataSource[i].Semester_Count;
      panel.instance.totalCredits = this.dataSource[i].total_Credit;

    }
  }
  onSave() {
    // debugger;
    // console.log(event);
    var depobj = this.service.DataAddReg;
    console.log(depobj);
    var addRegFinalObj = {
      Active: true,
      Regulation_ID: this.myForm.value.regulationId,
      Regulation_Name: this.myForm.value.regulationName,
      // Academic_Year: [parseInt(this.myForm.value.academicyear), parseInt(this.myForm.value.academicyear) + 4],
      Academic_Start_Year:this.myForm.value.academicyear,
      Academic_End_Year:this.myForm.value.academicyear,
      Course_Type: this.selectedCourse,
      Grading: this.data2,
      Department_Details: depobj
    }
    console.log(addRegFinalObj);
    var addRegFinalArray = [];
    addRegFinalArray.push(addRegFinalObj);
    var finalObj = {
      Regulation: addRegFinalArray
    }
    var a = this.http.post(`${this.uri}/Regulation/newregulation/${this.service.instid}`, finalObj);
    a.subscribe((data: any) => {
      console.log(data);
      if (data.msg === "Success") {
        alert("New Regulation Added Successfully");
        this.router.navigate(['regulation']);
      }
    },error=>{
      alert(error.error.error._message);
    });
    console.log(a);
    // this.service.postAddRegData(finalObj);
  }
  openGradingDialog() {
    const dialogRef = this.dialog.open(DialogGradingComponent, {
      height: '600px',
      width: '1000px',
      backdropClass:'dialogBackgroundClass',
      data: this.data2
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      if (result != undefined) {
        console.log(result);
        console.log(this.data2);
        this.data2 = result;
      } else {
        console.log(this.data2);
      }
    });
  }

}
