import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface regulationList {
  regulationName: string;
}

export interface tableData {
  sNo: number;
  subjectName:string;
  subjectCode:string;
  shortCode:string;
  credits:number;
}
export interface formEditData {
  subjectName:string;
  subjectCode:string;
  shortCode:string;
  credits:number;
}
export interface subTypes {
  sNo:number;
  Core:number;
  PE:number;
  OE:number
}

export interface regulationDetails {
  depName:string;
  sem:number;
  totalCredits:number;
  subjects:subTypes[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri:string = 'https://hidden-sierra-56427.herokuapp.com';

  oldData;
  rownumber;
  regulationListData: regulationList[] = [
    { regulationName: 'R15' },
    { regulationName: 'R16' },
    { regulationName: 'R17' },
    { regulationName: 'R18' },
    { regulationName: 'R19' },
    { regulationName: 'R20' },
    { regulationName: 'R21' }
  ]
  tableDisplayData:tableData[]=[
    {sNo: 1, subjectName: 'VLSI', subjectCode: '15EC1234', shortCode: 'VLSI',credits:4},
    {sNo: 2, subjectName: 'Communication Systems', subjectCode: '15EC1232', shortCode: 'CS',credits:4},
    {sNo: 3, subjectName: 'Signal Processing', subjectCode: '15EC1334', shortCode: 'SP',credits:4},
    {sNo: 4, subjectName: 'Digital Design', subjectCode: '15EC1134', shortCode: 'DLD',credits:4},
    {sNo: 5, subjectName: 'Electro Magnetics', subjectCode: '15EC1224', shortCode: 'EM',credits:4},
    {sNo: 6, subjectName: 'Control Systems', subjectCode: '15EC1214', shortCode: 'CS',credits:4}
  ]
  regulationDetailsData: regulationDetails[] = [{
    depName: "ECE",
    sem: 3,
    totalCredits:28,
    subjects: [{ sNo: 1, Core: 4, OE: 4, PE: 4 },
    { sNo: 2, Core: 4, OE: 4, PE: 4 },
    { sNo: 3, Core: 4, OE: 4, PE: 4 },
  ]
  },
  {
    depName: "CSE",
    sem: 5,
    totalCredits:28,
    subjects: [{ sNo: 1, Core: 4, OE: 4, PE: 4 },
    { sNo: 2, Core: 4, OE: 4, PE: 4 },
    { sNo: 3, Core: 4, OE: 4, PE: 4 },
    { sNo: 4, Core: 4, OE: 4, PE: 4 },
    { sNo: 5, Core: 4, OE: 4, PE: 4 }
  ]
  }
  ]
  constructor(private http: HttpClient) { }

  getRegulationData() {
    return this.http.get(`${this.uri}/Regulation`);
    }

    getTableData():tableData[]{
      return this.tableDisplayData;
    }
    getRegulationDetailsData():regulationDetails[]{
      return this.regulationDetailsData;
    }
    add(newdata: tableData) {
      var data={
        "sNo": this.tableDisplayData.length+1,
        "credits": newdata.credits,
        "subjectCode": newdata.subjectCode,
        "subjectName": newdata.subjectName,
        "shortCode":newdata.subjectCode

      }
      this.tableDisplayData.push(data);
    }
    editData(old:tableData){
       this.oldData = old;
    }
    afterEdit(changedData:formEditData){
      this.tableDisplayData[this.rownumber].subjectName=changedData.subjectName;
      this.tableDisplayData[this.rownumber].subjectCode=changedData.subjectCode;
      this.tableDisplayData[this.rownumber].shortCode=changedData.subjectName;
      this.tableDisplayData[this.rownumber].credits=changedData.credits;
    }
}
