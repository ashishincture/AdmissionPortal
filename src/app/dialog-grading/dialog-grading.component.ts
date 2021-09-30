import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-dialog-grading',
  templateUrl: './dialog-grading.component.html',
  styleUrls: ['./dialog-grading.component.css'],
})
export class DialogGradingComponent implements OnInit {
  @ViewChild('table') table: MatTable<Element>;
  dataSource: any[];
  gradetype = new Array();
  displayedColumns = new Array();
  toppings = new FormControl();
  toppingList: string[] = ['Points', 'Grade', 'Percentage', 'Description'];
  selectedToppings: string[] = ['Points', 'Grade', 'Percentage', 'Description'];
  gradingForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogGradingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = this.data.GradingDetails.slice(); // copy by value
    this.gradingForm = this.fb.group({
      points: ['', Validators.required],
      grade: ['', Validators.required],
      percentage: ['', Validators.required],
      description: ['', Validators.required],
      rangeHigh: ['', Validators.required],
      rangeLow: ['', Validators.required],
    });
    this.gradetype = this.fetchToppingsWithoutAction();
    this.selectedToppings = this.fetchToppingsWithoutAction();
    this.displayedColumns = this.fetchtoppings();
    this.setDisableState();
  }
  onGradeChange(event: any) {
    this.gradetype = event.source.value;
    this.setDisableState();
    // this.toppingList = this.gradetype.slice(); //cpoy by value
    this.displayedColumns = event.source.value;
    if(this.displayedColumns.indexOf('rangeHigh') === -1){
      this.displayedColumns.splice(0,0,'rangeHigh');
    }
    if(this.displayedColumns.indexOf('rangeLow') === -1){
      this.displayedColumns.splice(1,0,'rangeLow');
    }
    this.displayedColumns.push('action');
  }
  onSubmit() {
    console.log(this.gradingForm.value);
    var data = this.gradingForm.value;
    this.dataSource.push(data);
    this.table.renderRows();
    console.log(this.dataSource);
    this.gradingForm.reset(); //nj - modified
    // this.clearInputData();
  }
  clearInputData() {
    this.gradingForm.patchValue({
      points: '',
      grade: '',
      percentage: '',
      description: '',
    });
  }
  deleteRow(points: any) {
    console.log(points);

    var index = this.dataSource.findIndex(function (o) {
      return o.points === points;
    });
    if (index !== -1) this.dataSource.splice(index, 1);
    this.table.renderRows();
    console.log(this.dataSource);
  }
  fetchtoppings(): string[] {
    var temp = this.data.GradeType;
    console.log(temp);
    temp = temp.split('_');
    if(temp.indexOf('rangeHigh') === -1){
      // temp.push('rangeHigh');
      temp.splice(0,0,'rangeHigh');
    }
    if(temp.indexOf('rangeLow') === -1){
      // temp.push('rangeLow');
      temp.splice(1,0,'rangeLow');
    }
    
    temp.push('action');
    console.log(temp);
    return temp;
  }
  //Topping list without action button
  fetchToppingsWithoutAction(): string[] {
    var temp = this.data.GradeType;
    console.log(temp);
    temp = temp.split('_');
    return temp;
  }
  onSave() {
    if (this.gradetype.length > 1) {
      if (this.dataSource != undefined || this.dataSource != []) {
        this.data.GradeType = this.concatGradeValue();
        this.data.GradingDetails = this.dataSource.slice();
        for(var i=0;i<this.data.GradingDetails.length;i++){
          if(this.gradetype.indexOf('Points') === -1){
            this.data.GradingDetails[i].points = null;
          }
          if(this.gradetype.indexOf('Grade') === -1){
            this.data.GradingDetails[i].grade = null;
          }
          if(this.gradetype.indexOf('Percentage') === -1){
            this.data.GradingDetails[i].percentage = null;
          }
          if(this.gradetype.indexOf('Description') === -1){
            this.data.GradingDetails[i].description = null;
          }
        }
        this.dialogRef.close(this.data);
      } else {
        console.log('Table Data should not be empty');
      }
    } else {
      console.log('Grading Type should not be empty');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
  concatGradeValue() {
    var arr = this.gradetype.slice();
    var temp = '';
    var index = arr.indexOf('action');
    if (index > -1) {
      arr.splice(index, 1);
    }
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        temp = temp + arr[i];
        if (i + 1 < arr.length) {
          temp += '_';
        }
      }
    } else {
      return arr[0];
    }
    return temp;
    // if(arr.length === 1){
    //   temp = arr[0];
    //   return temp;
    // }else{
    //   temp = arr[0];
    //   for(let i=0;i<arr.length;i++){
    //     if(i+1 > arr.length)
    //       temp = temp +"_"+ arr[i+1];
    //     else{
    //       return temp
    //     }
    //   }
    // }
  }

  setDisableState() {
    var arr = this.gradetype.slice();
    var index;
    if (arr.indexOf('Points') === -1) {
      this.gradingForm.get('points').disable();
    } else {
      this.gradingForm.get('points').enable();
    }
    if (arr.indexOf('Grade') === -1) {
      this.gradingForm.get('grade').disable();
    } else {
      this.gradingForm.get('grade').enable();
    }
    if (arr.indexOf('Percentage') === -1) {
      this.gradingForm.get('percentage').disable();
    } else {
      this.gradingForm.get('percentage').enable();
    }
    if (arr.indexOf('Description') === -1) {
      this.gradingForm.get('description').disable();
    } else {
      this.gradingForm.get('description').enable();
    }
  }
}
