import { Component, OnInit, NgZone } from '@angular/core';
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
  dataTemplate = {
    name: '',
    percent: '',
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
        plottooltext: '<b>$Value</b> of web servers run on $label servers',
        showLegend: '1',
        showPercentValues: '1',
        legendPosition: 'bottom',
        useDataPlotColorForLabels: '1',
        enablemultislicing: '0',
        showlegend: '0',
        theme: 'fusion',
        bgColor: '#000000',
      },
      data:
        // this.global.data.CollegeQuotas
        [
          {
            label: 'General Merit',
            value: '32647479',
          },
          {
            label: 'Other Backward Class',
            value: '22100932',
          },
          {
            label: 'SC/ST',
            value: '18674221',
          },
          {
            label: 'Management Quota',
            value: '18674221',
          },
          {
            label: 'Women Quota',
            value: '18674221',
          },
        ],
    };
  }
  myControl = new FormControl();
  options: string[] = [
    'R.V College of Engineering',
    'BMS Institute of Technology',
    'Siddaganga Institute of Technology',
    'Siddharatha Institute of Technology',
  ];

  collegeNames = [
    {
      name: 'R.V College of Engineering',
      courses: [
        {
          cname: 'Computer Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Information Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Civil Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Mechanical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Instrumentation engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Electrical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
      ],
    },
    {
      name: 'BMS Institute of Technology',
      courses: [
        {
          cname: 'Information Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Computer Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Civil Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Mechanical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Instrumentation engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Electrical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
      ],
    },
    {
      name: 'Siddaganga Institute of Technology',
      courses: [
        {
          cname: 'Mechanical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Information Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Civil Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Computer Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Instrumentation engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Electrical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
      ],
    },
    {
      name: 'Siddharatha Institute of Technology',
      courses: [
        {
          cname: 'Civil Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Information Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Mechanical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Computer Science and Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Instrumentation engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
        {
          cname: 'Electrical Engineering',
          quotadata: [
            {
              label: 'General Merit',
              value: '32647479',
            },
            {
              label: 'Other Backward Class',
              value: '22100932',
            },
            {
              label: 'SC/ST',
              value: '18674221',
            },
            {
              label: 'Management Quota',
              value: '18674221',
            },
            {
              label: 'Women Quota',
              value: '18674221',
            },
          ],
        },
      ],
    },
  ];
  courselistarray = [];
  filteredOptions: Observable<String[]>;
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // this.dialogRef.updateSize('80%', '80%');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.colname = filterValue;
    console.log(filterValue);
    //console.log(this.collegeNames);
    this.courselistarray = [];
    for (var i = 0; i < this.collegeNames.length; i++) {
      console.log(filterValue);
      console.log(typeof filterValue);
      console.log(this.collegeNames[i].name.toLowerCase());
      console.log(typeof this.collegeNames[i].name);
      console.log(filterValue == this.collegeNames[i].name.toLowerCase());
      if (filterValue == this.collegeNames[i].name.toLowerCase()) {
        console.log(this.collegeNames[i].courses[0]);
        for (var j = 0; j < this.collegeNames[i].courses.length; j++) {
          this.courselistarray.push(this.collegeNames[i].courses[j].cname);
        }
        console.log(this.courselistarray);
      }
    }
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  chartchange(i) {
    console.log(i);
    console.log(this.colname);
    for (var m = 0; m < this.collegeNames.length; m++) {
      if (this.collegeNames[m].name.toLowerCase() === this.colname) {
        for (var n = 0; n < this.collegeNames[m].courses.length; n++) {
          if (i == this.collegeNames[m].courses[n].cname) {
            //this.dataSource = this.collegeNames[m].courses[n].quotadata;
            // this.dataSource.data.push()
            console.log(this.collegeNames[m].courses[n].quotadata);
          }
        }
      }
    }
  }
  onPressAddQuota() {
    this.global.data.CollegeQuotas.push(this.dataTemplate);
    this.dataTemplate = {
      name: "",
      percent: ""
      
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
