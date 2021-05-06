import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewComponent } from '../dialog-new/dialog-new.component';
import { Globals } from '../globals'
//dialogRef: MatDialogRef <any> ;



var college = new Array([
  {
    name: 'R.V College of Engineering',
    "id": 1,
    "course": [{
      "cname": "CSE",
      "cid": 1,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "ISE",
      "cid": 2,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "ECE",
      "cid": 3,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "MECH",
      "cid": 4,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "CIVIL",
      "cid": 5,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "EEE",
      "cid": 6,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    }

    ]
  },

  {
    "name": 'BMS Institute of Technology',
    "id": 1,
    "course": [{
      "cname": "CSE",
      "cid": 1,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "ISE",
      "cid": 2,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "ECE",
      "cid": 3,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "MECH",
      "cid": 4,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "CIVIL",
      "cid": 5,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    },
    {
      "cname": "EEE",
      "cid": 6,
      "Quotas": [
        {
          "Qid": 1,
          "Qname": "GM",
          "Seats": 20
        },
        {
          "Qid": 2,
          "Qname": "OBC",
          "Seats": 20
        },
        {
          "Qid": 3,
          "Qname": "SC/ST",
          "Seats": 20
        },
        {
          "Qid": 4,
          "Qname": "Management",
          "Seats": 20
        }

      ]
    }

    ]
  }

]);
@Component({
  selector: 'app-seatmatrix',
  templateUrl: './seatmatrix.component.html',
  styleUrls: ['./seatmatrix.component.css']
})
export class SeatmatrixComponent implements OnInit {

  dataTemplate = {
    name: "",
    percent: ""
  };
  public show: boolean = false;
  public buttonName: any = 'Show';
  dataSource: any;
  selectedSlice = 'none';
  chart: any;
  constructor(private zone: NgZone, public dialog: MatDialog, public global: Globals) {
    this.global.data
    this.dataSource = {
      "chart": {
        "caption": "Seats Division",
        "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
        "showLegend": "1",
        "showPercentValues": "1",
        "legendPosition": "bottom",
        "useDataPlotColorForLabels": "1",
        "enablemultislicing": "0",
        "showlegend": "0",
        "theme": "fusion",
        "bgColor": "#000000",
      },
      "data": 
      // this.global.data.CollegeQuotas
      [{
        "label": "General Merit",
        "value": "32647479"
      }, {
        "label": "Other Backward Class",
        "value": "22100932"
      }, {
        "label": "SC/ST",
        "value": "18674221"
      }, {
        "label": "Management Quota",
        "value": "18674221"
      }, {
        "label": "Women Quota",
        "value": "18674221"
      }
      ]
    };
  }
  myControl = new FormControl();
  options: string[] = ['R.V College of Engineering', 'BMS Institute of Technology', 'Siddaganga Institute of Technology', "Siddharatha Institute of Technology"];
  filteredOptions: Observable<string[]>;
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );


    // this.dialogRef.updateSize('80%', '80%');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  openDialog() {
    var that = this;
    this.dialog.open(DialogNewComponent, {
      width: '75%'
    });
    console.log(college[0]);
  }


}




