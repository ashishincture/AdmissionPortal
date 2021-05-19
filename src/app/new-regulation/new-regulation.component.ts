import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit,ElementRef,ViewChild ,ViewContainerRef,ComponentFactoryResolver} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { NewregTableComponent } from '../newreg-table/newreg-table.component';

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
  tableRow = [1,2,3,4,5];
  tableVisibility= true;
  eflag = this.service.eidtFlag;

  displayedColumns: string[] = ['semNo', 'core', 'pe', 'oe'];
  dataSource ;

  @ViewChild('tableId', { read: ViewContainerRef, static: false })

  container!: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private service:DataService,
    private componentFactoryResolver:ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    if(this.eflag === true){
      this.myForm = this.fBuilder.group({
        regulationName: ['', [Validators.required,]],
        regulationId: ['', [Validators.required,]],
        semesters:[3, [Validators.required,]],
        academicyear:[2020, [Validators.required,]],
        gradeType: ["Grading", [Validators.required,]]
      })
      this.onConfirm();
    }
    else{
      this.myForm = this.fBuilder.group({
        regulationName: ['', [Validators.required,]],
        regulationId: ['', [Validators.required,]],
        semesters:['', [Validators.required,]],
        academicyear:['', [Validators.required,]],
        gradeType: ['', [Validators.required,]]
      })
    }
  }
  onConfirm(){
    // var curData = this.tableRow;
    // curData.push(this.tableRow.length+1);
    // this.service.data=curData;
    this.tableVisibility =false;
    debugger;
    this.dataSource = this.service.getAddRegTableData(this.myForm.value.semesters);

    this.service.DataAddReg=this.dataSource;
    for(var i=0;i<this.dataSource.length;i++){
      
      let crViewfactory=this.componentFactoryResolver.resolveComponentFactory(NewregTableComponent);
      let panel=this.container.createComponent(crViewfactory);
      panel.instance.tableSource=this.dataSource[i].Credit_Details;
      panel.instance.depName=this.dataSource[i].Department_ID; 
      panel.instance.semNo=this.dataSource[i].Semester_Count; 
      panel.instance.totalCredits=this.dataSource[i].total_Credit;

    }
  }
  onSave(){
    // debugger;
    // console.log(event);
    var depobj = this.service.DataAddReg;
    console.log(depobj);
    var addRegFinalObj = {
    Regulation_Name:this.myForm.value.regulationName,
    Regulation_Id:this.myForm.value.regulationId,
    Academic_Year:[parseInt(this.myForm.value.academicyear),parseInt(this.myForm.value.academicyear) + 4],
    Department_Details:depobj
    }
    console.log(addRegFinalObj);
  }

}
