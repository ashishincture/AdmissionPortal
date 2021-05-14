import { Component, OnInit, NgZone } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-dialog-new',
  templateUrl: './dialog-new.component.html',
  styleUrls: ['./dialog-new.component.css']
})
export class DialogNewComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = 'Show';

  dataSource: any;
  selectedSlice = 'none';
  chart: any;
  constructor(private zone: NgZone) {
    this.dataSource = {
      "chart": {
        "caption": "Computer Science and Engineering",
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
      "data": [{
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

  ngOnInit(): void {
  }

}
