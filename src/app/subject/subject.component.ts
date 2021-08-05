import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ActivatedRoute,Router} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SubjectService } from '../subject.service';
import * as XLSX from 'xlsx';
import { ToastrService} from 'ngx-toastr';
// import { debugger } from 'fusioncharts';
// const XLSX = require('xlsx');
// import {SubjectClass} from "../models/SubjectClass.model";
// import {Batch} from "../data";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Batch {
  Batch_ID: string;
  Batch_Name: string;
  Academic_Year: Array<any>;
  Regulation_ID: string;
}
export interface Regulation {
  Regulation_ID: string;
  Regulation_Name: string;
  Academic_Year: Array<any>;
}
export interface Department {
  Department_Name: string;
  Department_ID: string;
}
export interface Subject {
  Subject_ID: string;
  Subject_Name: string;
  isActive: boolean;
  Type: string;
  Department_ID: string;
  Regulation_ID: string;
  Credit: string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  Regulations: Regulation[] = [];
  Departments: Department[] = [];
  Subjects: Subject[] = [];
  newTablelist: Subject[] = [];
  dummy = this.Subjects;
  SubSearchKey: any;
  arrayBuffer: any;
  DeptSearchKey: string;
  DeptIdKey:string;
  RegulationSearchKey:string;
  subjectInstance: Subject = {
    Subject_ID: "",
    Subject_Name: "",
    isActive: false,
    Type: "",
    Department_ID: "",
    Regulation_ID: "",
    Credit: "",
  };
  displayedColumns: string[] = ['Subject_ID', 'Subject_Name', 'Type', 'Credit', 'actions'];
  @ViewChild(MatTable)table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
pageIndex = 0;
pageSize = 10;
pageSizeOptions = [10, 15, 20];
dataSource: MatTableDataSource<Subject>;
@ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(public dialog: MatDialog, private SubjectService: SubjectService,private toastr: ToastrService, private route:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.DeptIdKey=history.state.data.Department_ID;
    this.fetchRegulation();
    this.fetchDepartment();
    this.fetchSubjectlist(this.DeptIdKey);
  }
  fetchRegulation() {
    this.SubjectService.getRegulation().
      subscribe((data: any) => {
        this.Regulations = data.data.Regulation;
        this.RegulationSearchKey = this.Regulations[0].Regulation_Name;
        this.fetchDepartmentByRegId(this.RegulationSearchKey);
      });
  }
  fetchDepartment() {
    this.SubjectService.getDepartment().
      subscribe((data: any) => {
        console.log(data);
        this.Departments = data.data.Regulation[0].Department_Details;
        // this.DeptSearchKey=this.Departments[0].Department_Name;
      });
  }
  fetchDepartmentByRegId(ID){
    this.SubjectService.getDepartmentByRegId(ID).subscribe((data: any) => {
      this.Departments = data.data.Department_Details;
      this.DeptSearchKey=this.Departments[0].Department_Name;
    });
  }
  fetchSubjectlist(ID) {
    this.SubjectService.getSubjectList(ID).
      subscribe((data: any) => {
        this.Subjects = data.data;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.Subjects);
      });
  }
  onAddNewSubject() {
    const dialogRef = this.dialog.open(UpdateDialogComponent,{data: {type:"Create",data:{
      Subject_ID: "",
      Subject_Name: "",
      isActive: false,
      Type: "",
      Department_ID: this.DeptSearchKey,
      Regulation_ID: this.RegulationSearchKey,
      Credit: "",
    }} });
    dialogRef.afterClosed().subscribe((result) => {
      for(var i=0;i<this.Departments.length;i++){
        if(result.data.Department_ID ==this.Departments[i].Department_Name)
        result.data.Department_ID=this.Departments[i].Department_ID;
        break;
      }
      this.SubjectService.createSubject(result.data).subscribe((data: any) => {
        console.log(data.data.msg);
        this.fetchSubjectlist(this.DeptIdKey);
        this.table.renderRows();
      });

    });
  }
  onEditSubject(rowData: any) {
    console.log(rowData);
    const dialogRef = this.dialog.open(UpdateDialogComponent, { data: rowData });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.edited) {
        this.SubjectService.updateSubject(result.data.Subject_ID, result.data).subscribe((data: any) => {
          console.log(data.data.msg);
          this.fetchSubjectlist(this.DeptIdKey);
          this.table.renderRows();
        });
      }

    });
  }
  // SubSearch() {
  //   if (this.SubSearchKey == "") {
  //     this.ngOnInit();
  //   }
  //   else {
  //     this.dataSource = this.Subjects.filter(res => {
  //       return res.Subject_Name.toLocaleLowerCase().match(this.SubSearchKey.toLocaleLowerCase());
  //     });
  //   }
  // }


  SubSearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  key = "Subject_Name";
  reverse: boolean = false;
  SubSort(Subject_Name: any) {
    this.key = Subject_Name;
    this.reverse = !this.reverse;
  }
  DeptSearch(oEvent) {
   var deptOption = parseInt(oEvent.source.selected.id.split("-")[2],10);
   this.DeptIdKey = this.Departments[deptOption-1].Department_ID;
   this.fetchSubjectlist(this.DeptIdKey);
    console.log(oEvent.value);
    this.DeptSearchKey=oEvent.value;
  }
  RegulationSearch(oEvent){
    console.log(oEvent.value);
    this.RegulationSearchKey=oEvent.value;
    this.fetchDepartmentByRegId(this.RegulationSearchKey);
  }
  onFileUpload(oEvent) {
    var file = oEvent.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.newTablelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // var filelist =[];    
      // filelist=newTablelist;
      console.log(this.newTablelist)
      var j, crctArray = [], errArray = [], flag = 0;
      for (var i = 0; i < this.newTablelist.length; i++, flag = 0) {
        for (j = 0; j < this.dataSource.data.length; j++) {
          if (this.newTablelist[i].Subject_ID === this.dataSource.data[j].Subject_ID) {
            flag = 1;
          }
        }
        if (flag) {
          errArray.push(this.newTablelist[i]);
        }
        else {
          crctArray.push(this.newTablelist[i]);
        }
      }
        this.SubjectService.createSubjectBulkUpload(crctArray).subscribe((data:any)=>{
          console.log(data.data.msg);
          this.fetchSubjectlist(this.DeptIdKey);
        this.table.renderRows();
        },
        (err) => {console.log(err)});
      if (errArray.length) {
        this.toastr.error('Out of '+this.newTablelist.length+ ' Subjects uploaded, '+ errArray.length+ ' records contain Invalid Data.' , 'Error',{
     timeOut: 10000,
     extendedTimeOut: 0
});
        var ws = XLSX.utils.json_to_sheet(errArray);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Error");
        XLSX.writeFile(wb, "InvalidSubjectRecords.xlsx");
      }

    

    // this.table.renderRows();
  }
}


  ///template download
  templateDownloadFn(){
    var Heading = [
      ["Subject_ID", "Subject_Name", "isActive","Type","Credit"],
    ];
    var Data = [];
    
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(Data);
    XLSX.utils.sheet_add_aoa(ws, Heading); //heading: array of arrays
    XLSX.utils.book_append_sheet(wb, ws,"template");
  
    XLSX.writeFile(wb, 'dummy.xlsx') 
  }
  
}
