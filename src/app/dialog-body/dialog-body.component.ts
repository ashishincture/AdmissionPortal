import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DialogBodyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  dataStudentsListFragment = new MatTableDataSource();
  displayedStudentsFragmentList: string[] = ['semesterNo', 'SGPA', 'Action'];

  dataSources = this.data.semesterData;

  ngOnInit(): void {

  }
  close() {
    this.dialogRef.close();
    for (let i = 0; i < this.dataSources.length; i++) {
        this.dataSources[i].isExpanded = false;
    }
  }

}
