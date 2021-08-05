import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ViewContainerRef,Inject
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog,MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { DialogNewComponent } from '../dialog-new/dialog-new.component';
import { Globals } from '../globals';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

//dialogRef: MatDialogRef <any> ;

export interface DialogData {
 
    Quota_name: '',
    Quota_percentage: '',
   
}

@Component({
  selector: 'app-seatmatrix',
  templateUrl: './seatmatrix.component.html',
  styleUrls: ['./seatmatrix.component.css'],
})
export class SeatmatrixComponent implements OnInit {
  @ViewChild('chartid', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;
  dataTemplate = {
    Quota_name: '',
    Quota_percentage: '',
    Quota_allocation: '',
  };
  uri = 'https://university-app-2021.herokuapp.com/institute/quota/';

  courseID = '';
  public show: boolean = false;
  public buttonName: any = 'Show';
  public colname: String;
  public isInputShown: boolean;
  public Quota_name: string;
  public Quota_percentage: string;


  dataSource: any;
  selectedSlice = 'none';
  chart: any;
  constructor(
    private zone: NgZone,
    public dialog: MatDialog,
    public global: Globals,
    public http: HttpClient,
 
  ) {
    this.global.data;
    this.dataSource = {
      chart: {
        caption: 'Seats Division',
        plottooltext:
          '<b>$Value</b> number of seats are allocated to $label quota',
        showLegend: '1',
        showPercentValues: '<b>$Value</b>',
        legendPosition: 'bottom',
        useDataPlotColorForLabels: '1',
        enablemultislicing: '0',
        showlegend: '0',
        theme: 'fusion',
        bgColor: '#000000',
      },
      data:
        // this.global.data.CollegeQuotas
        [],
    };
  }
  myControl = new FormControl();
  options: string[] = [];
  collegenamenew = [];
  code = 0;
  graphvalue = {
    label: '',
    value: '',
  };
  sum = 0;
  courselistarray = [];
  courseIDarray = [];
  filteredOptions: Observable<String[]>;
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // console.log(this.global.data.CollegeDetail);
    for (var i = 0; i < this.global.data.CollegeDetail.length; i++) {
      this.options.push(this.global.data.CollegeDetail[i].college.toString());
      this.collegenamenew[i];
    }
    console.log(this.global.data.DeptDetail);
    for (var i = 0; i < this.global.data.DeptDetail.length; i++) {
      this.options.push(this.global.data.DeptDetail[i].dept);
    }
    //this.coursedisable = false;
    this.isInputShown = false;
    // this.dialogRef.updateSize('80%', '80%');
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    this.colname = filterValue;
    console.log(filterValue);
    //console.log(this.collegeNames);
    this.courselistarray = [];
    console.log(this.global.data.CollegeDetail);
    for (var i = 0; i < this.global.data.CollegeDetail.length; i++) {
      if (filterValue == this.global.data.CollegeDetail[i].college) {
        this.code = 1;
        for (
          var j = 0;
          j < this.global.data.CollegeDetail[i].SubjectListCollege.length;
          j++
        ) {
          this.courselistarray.push(
            this.global.data.CollegeDetail[i].SubjectListCollege[j].Course_id +
              ' ' +
              ':' +
              ' ' +
              this.global.data.CollegeDetail[i].SubjectListCollege[j]
                .Course_name +
              ' ' +
              this.global.data.CollegeDetail[i].SubjectListCollege[j]
                .Course_type
          );
          this.courseIDarray.push(
            this.global.data.CollegeDetail[i].SubjectListCollege[j].Course_id
          );
        }
      }
    }
    for (var i = 0; i < this.global.data.DeptDetail.length; i++) {
      if (filterValue == this.global.data.DeptDetail[i].dept) {
        this.code = 2;
        for (
          var j = 0;
          j < this.global.data.DeptDetail[i].SubjectListDept.length;
          j++
        ) {
          this.courselistarray.push(
            this.global.data.DeptDetail[i].SubjectListDept[j].Course_id +
              ' ' +
              ':' +
              ' ' +
              this.global.data.DeptDetail[i].SubjectListDept[j].Course_name +
              ' ' +
              this.global.data.DeptDetail[i].SubjectListDept[j].Course_type
          );
          this.courseIDarray.push(
            this.global.data.DeptDetail[i].SubjectListDept[j].Course_id
          );
        }
      }
    }
    // for (var i = 0; i < this.collegeNames.length; i++) {
    //   console.log(filterValue);
    //   console.log(typeof filterValue);
    //   console.log(this.collegeNames[i].name.toLowerCase());
    //   console.log(typeof this.collegeNames[i].name);
    //   console.log(filterValue == this.collegeNames[i].name.toLowerCase());
    //   if (filterValue == this.collegeNames[i].name.toLowerCase()) {
    //     console.log(this.collegeNames[i].courses[0]);
    //     for (var j = 0; j < this.collegeNames[i].courses.length; j++) {
    //       this.courselistarray.push(this.collegeNames[i].courses[j].cname);
    //     }
    //     console.log(this.courselistarray);
    //   }
    // }
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  chartchange(i) {
    // var temp = this.container;
    // this.container.clear();
    // this.chart.update();
    // console.log(temp);
    this.isInputShown = false;
    this.courseID = '';
    this.sum = 0;
    console.log(i);
    console.log(this.colname);
    while (this.dataSource.data.length > 0) {
      this.dataSource.data.pop();
    }
    this.dataSource.data = [];
    var graphdata = {
      Value: '',
      label: '',
    };

    if (this.code == 1) {
      var l = 0;
      for (var m = 0; m < this.global.data.CollegeDetail.length; m++) {
        if (this.colname == this.global.data.CollegeDetail[m].college) {
          for (
            var n = 0;
            n < this.global.data.CollegeDetail[m].SubjectListCollege.length;
            n++
          ) {
            if (
              i ==
              this.global.data.CollegeDetail[m].SubjectListCollege[n]
                .Course_id +
                ' ' +
                ':' +
                ' ' +
                this.global.data.CollegeDetail[m].SubjectListCollege[n]
                  .Course_name +
                ' ' +
                this.global.data.CollegeDetail[m].SubjectListCollege[n]
                  .Course_type
            ) {
              for (
                var k = 0;
                k <
                this.global.data.CollegeDetail[m].SubjectListCollege[n]
                  .SeatAlloted.length;
                k++
              ) {
                this.graphvalue.label = '';
                this.graphvalue.label =
                  this.global.data.CollegeDetail[m].SubjectListCollege[
                    n
                  ].SeatAlloted[k].Quota_name;
                this.graphvalue.value = '';
                this.graphvalue.value =
                  '' +
                  Math.round(
                    this.global.data.CollegeDetail[m].SubjectListCollege[n]
                      .SeatAlloted[k].Quota_allocation
                  );
                graphdata = {
                  Value: this.graphvalue.value,
                  label: this.graphvalue.label,
                };
                this.dataSource.data.push(graphdata);
                console.log(this.dataSource.data);
                l++;
              }
              //this.dataSource.data = [];
            }
          }
        }
      }
    } else if (this.code == 2) {
      for (var m = 0; m < this.global.data.DeptDetail.length; m++) {
        if (this.colname == this.global.data.DeptDetail[m].dept) {
          for (
            var n = 0;
            n < this.global.data.DeptDetail[m].SubjectListDept.length;
            n++
          ) {
            if (
              i ==
              this.global.data.DeptDetail[m].SubjectListDept[n].Course_id +
                ' ' +
                ':' +
                ' ' +
                this.global.data.DeptDetail[m].SubjectListDept[n].Course_name +
                ' ' +
                this.global.data.DeptDetail[m].SubjectListDept[n].Course_type
            ) {
              //console.log(this.global.data.DeptDetail[m].SubjectListDept);
              for (
                var k = 0;
                k <
                this.global.data.DeptDetail[m].SubjectListDept[n].SeatAlloted
                  .length;
                k++
              ) {
                this.graphvalue.label = '';
                this.graphvalue.label =
                  this.global.data.DeptDetail[m].SubjectListDept[n].SeatAlloted[
                    k
                  ].Quota_name;
                this.graphvalue.value = '';
                this.graphvalue.value =
                  '' +
                  Math.round(
                    this.global.data.DeptDetail[m].SubjectListDept[n]
                      .SeatAlloted[k].Quota_allocation
                  );
                graphdata = {
                  Value: this.graphvalue.value,
                  label: this.graphvalue.label,
                };
                this.dataSource.data.push(graphdata);
                console.log(this.dataSource.data);
              }
              //this.dataSource.data = [];
            }
          }
        }
      }
    }
  }
  onPressAddQuota() {
    var collegecode;
    console.log(this.courseID);
    this.dataTemplate.Quota_name=this.Quota_name;
    this.dataTemplate.Quota_percentage=this.Quota_percentage;
    this.global.data.CollegeQuotas.push(this.dataTemplate);
    if (this.code == 1) {
      for (var i = 0; i < this.global.data.CollegeDetail.length; i++) {
        for (
          var j = 0;
          j < this.global.data.CollegeDetail[i].SubjectListCollege.length;
          j++
        ) {
          if (
            this.courseID ==
            this.global.data.CollegeDetail[i].SubjectListCollege[j].Course_id
          ) {
            this.dataTemplate.Quota_allocation =
              '' +
              Math.round(
                (parseInt(this.dataTemplate.Quota_percentage) *
                  parseInt(
                    this.global.data.CollegeDetail[i].SubjectListCollege[j]
                      .Seats
                  )) /
                  100
              );
            this.global.data.CollegeDetail[i].SubjectListCollege[
              j
            ].SeatAlloted.push(this.dataTemplate);
          }
        }
      }
    } else if (this.code == 2) {
      for (var i = 0; i < this.global.data.DeptDetail.length; i++) {
        for (
          var j = 0;
          j < this.global.data.DeptDetail[i].SubjectListDept.length;
          j++
        )
          if (
            this.courseID ==
            this.global.data.DeptDetail[i].SubjectListCollege[j].Course_id
          ) {
            this.dataTemplate.Quota_allocation =
              '' +
              Math.round(
                (parseInt(this.dataTemplate.Quota_percentage) *
                  parseInt(
                    this.global.data.DeptDetail[i].SubjectListCollege[j].Seats
                  )) /
                  100
              );
            this.global.data.DeptDetail[i].SubjectListCollege[
              j
            ].SeatAlloted.push(this.dataTemplate);
          }
      }
    }

    this.show = false;
    for (var i = 0; i < this.global.data.CollegeDetail.length; i++) {
      if (this.colname == this.global.data.CollegeDetail[i].college) {
        collegecode = this.global.data.CollegeDetail[i].collegeCode;
      }
    }
    this.sum = this.sum + parseInt(this.dataTemplate.Quota_percentage);

    console.log('sum' + ' ' + this.sum);
    if (this.sum == 100) {
      var data2 = {
        Course_id: this.courseID,
        Quotas: this.global.data.CollegeQuotas,
      };
      console.log('data2' + ' ' + data2);
      let univ = this.http.put(`${this.uri}` + collegecode, data2);
      univ.subscribe((data: any) => console.log(data));
      console.log('data2 next' + ' ' + data2);
      console.log(this.global.data.CollegeQuotas);
      this.global.data.CollegeQuotas = [];
    }
    this.dataTemplate = {
      Quota_name: '',
      Quota_percentage: '',
      Quota_allocation: '',
    };
    this.toggle();
  }
  OnClickAddQuota(){
    this.openDialog();
  }
  toggle() {
    this.show = !this.show;
    this.isInputShown = true;
    //this.sum = 0;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
  openDialog(){
    var that = this;
   let dialogRef = this.dialog.open(DialogExampleComponent, {data: {Quota_name : this.Quota_name,Quota_percentage:this.Quota_percentage}});
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.Quota_name = result.Quota_name;
    this.Quota_percentage=result.Quota_percentage;
   this.onPressAddQuota();
    
  });

  console.log(this.Quota_name);
    console.log(this.Quota_percentage);

  
  
  }
}
