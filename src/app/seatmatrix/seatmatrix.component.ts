import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewComponent } from '../dialog-new/dialog-new.component';
import { Globals } from '../globals';

//dialogRef: MatDialogRef <any> ;

@Component({
  selector: 'app-seatmatrix',
  templateUrl: './seatmatrix.component.html',
  styleUrls: ['./seatmatrix.component.css'],
})
export class SeatmatrixComponent implements OnInit {
  @ViewChild('chartid', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;
  dataTemplate = {
    name: '',
    percent: '',
    allotedseats: '',
  };
  public show: boolean = false;
  public buttonName: any = 'Show';
  public colname: String;
  dataSource: any;
  selectedSlice = 'none';
  chart: any;
  constructor(
    private zone: NgZone,
    public dialog: MatDialog,
    public global: Globals
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
  courselistarray = [];
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
        console.log(
          'subject value' +
            this.global.data.CollegeDetail[i].SubjectListCollege.length
        );
        for (
          var j = 0;
          j < this.global.data.CollegeDetail[i].SubjectListCollege.length;
          j++
        ) {
          this.courselistarray.push(
            this.global.data.CollegeDetail[i].SubjectListCollege[j].Course_name
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
            this.global.data.DeptDetail[i].SubjectListDept[j].name
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
              i == this.global.data.CollegeDetail[m].SubjectListCollege[n].name
            ) {
              console.log(this.global.data.CollegeDetail[m].SubjectListCollege);
              for (
                var k = l;
                k <
                this.global.data.CollegeDetail[m].SubjectListCollege[n]
                  .SeatAlloted.length;
                k++
              ) {
                this.global.data.CollegeDetail[m].SubjectListCollege[
                  n
                ].SeatAlloted[k].allotedseats =
                  (parseInt(
                    this.global.data.CollegeDetail[m].SubjectListCollege[n]
                      .SeatAlloted[k].percent
                  ) *
                    parseInt(
                      this.global.data.CollegeDetail[m].SubjectListCollege[n]
                        .Seats
                    )) /
                  100;
                this.graphvalue.label = '';
                this.graphvalue.label =
                  this.global.data.CollegeDetail[m].SubjectListCollege[
                    n
                  ].SeatAlloted[k].name;
                this.graphvalue.value = '';
                this.graphvalue.value =
                  '' +
                  Math.round(
                    this.global.data.CollegeDetail[m].SubjectListCollege[n]
                      .SeatAlloted[k].allotedseats
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
            if (i == this.global.data.DeptDetail[m].SubjectListDept[n].name) {
              console.log(this.global.data.DeptDetail[m].SubjectListDept);
              for (
                var k = l;
                k <
                this.global.data.DeptDetail[m].SubjectListDept[n].SeatAlloted
                  .length;
                k++
              ) {
                this.global.data.DeptDetail[m].SubjectListDept[n].SeatAlloted[
                  k
                ].allotedseats =
                  (parseInt(
                    this.global.data.DeptDetail[m].SubjectListDept[n]
                      .SeatAlloted[k].percent
                  ) *
                    parseInt(
                      this.global.data.DeptDetail[m].SubjectListDept[n].Seats
                    )) /
                  100;
                this.graphvalue.label = '';
                this.graphvalue.label =
                  this.global.data.DeptDetail[m].SubjectListDept[n].SeatAlloted[
                    k
                  ].name;
                this.graphvalue.value = '';
                this.graphvalue.value =
                  '' +
                  Math.round(
                    this.global.data.DeptDetail[m].SubjectListDept[n]
                      .SeatAlloted[k].allotedseats
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
    }
  }
  onPressAddQuota() {
    this.global.data.CollegeQuotas.push(this.dataTemplate);
    if (this.code == 1) {
      for (var i = 0; i < this.global.data.CollegeDetail.length; i++) {
        for (
          var j = 0;
          j < this.global.data.CollegeDetail[i].SubjectListCollege.length;
          j++
        ) {
          this.global.data.CollegeDetail[i].SubjectListCollege[
            j
          ].SeatAlloted.push(this.dataTemplate);
        }
      }
    } else if (this.code == 2) {
      for (var i = 0; i < this.global.data.DeptDetail.length; i++) {
        for (
          var j = 0;
          j < this.global.data.DeptDetail[i].SubjectListDept.length;
          j++
        ) {
          this.global.data.DeptDetail[i].SubjectListDept[j].SeatAlloted.push(
            this.dataTemplate
          );
        }
      }
    }
    this.dataTemplate = {
      name: '',
      percent: '',
      allotedseats: '',
    };

    this.toggle();
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
}
