
import { PeriodicElement } from './dataStr';

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiMarksUploadService {
  private _base_url:string="https://university-app-2021.herokuapp.com";
  private _url:string="";
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  public httpOptions1 ={ responseType: 'blob'};
  constructor(private http: HttpClient) { }

  getStudents():Observable<PeriodicElement[]>
  {
    return this.http.get<PeriodicElement[]>(this._url);
  }
  getCompDetails(data:object)
  {
    this._url=this._base_url+"/Subject/getSubjectSkeleton"
    return this.http.post<any>(this._url,data);
  }
  getInstitutionList(){
    this._url=""
    this._url= this._base_url + "/institute/all"
    return this.http.get<any>(this._url);
  }
  getRegulationList(data:object){
    this._url=""
    this._url= this._base_url + "/Regulation/all"
    return this.http.post<any>(this._url, data, this.httpOptions);
  }
  getAcademicList(data:object){
    this._url=""
    this._url= this._base_url + "/Regulation/getAcademic"
    return this.http.post<any>(this._url, data, this.httpOptions);
  }
  getDepartmentList(data:object)
  {
    this._url=""
    this._url= this._base_url + "/Regulation/departments"
    return this.http.post<any>(this._url, data, this.httpOptions);
  }
  getCurriculumList(data:object)
  {
    this._url=""
    this._url= this._base_url + "/Regulation/departments/curriculums"
    
   
   return this.http.post<any>(this._url, data, this.httpOptions);
  }
  getResponseBlob(data:object):Observable<any>
  {
    
    // return this.http.post<any>(this._url,data);
    return new Observable(obs=>{
      var oReq = new XMLHttpRequest();
      oReq.open("POST", "https://university-app-2021.herokuapp.com/student/getStudentMarksData", true);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.responseType = "arraybuffer";

      oReq.onload = function (oEvent) {
        var arrayBuffer = oReq.response;
        if (arrayBuffer) {
          var byteArray = new Uint8Array(arrayBuffer);
          console.log(byteArray, byteArray.length);
          obs.next(byteArray);
          // this.downloadFile(byteArray, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'export.xlsx');
        }
      };
      const body=JSON.stringify(data)
      oReq.send(body);
    });
    
  }
  
  getSemesterList(data:object)
  {
    this._url=""
    this._url= this._base_url + "/institute/semesters/"
   
   return this.http.post<any>(this._url, data, this.httpOptions);
  }

  getSubjectList(data:object)
  {
    
    this._url=""
    this._url= this._base_url + "/institute/subjects/"
    
   
   return this.http.post<any>(this._url, data, this.httpOptions);
    
  }
  postExcelData(dataP:any)
  {
    var data = 
    {

      "reg_id": "I1",
      "dep_id": "IIT001",
      "ins_id": "02",
      "sem_no": "1",
      "acad": "2021",
      "cur_id":"CR01",
      "patternId":"pat",
      "sub_code": "Maths"
  
  };
    this._url=""
    this._url= this._base_url + "/student/updateStudentMarks/"+data.ins_id + "/"+data.reg_id+"/"+data.dep_id+"/"+data.cur_id+"/"+data.sem_no+"/"+data.sub_code
    return this.http.put<any>(this._url,dataP).pipe(
      catchError(this.errorHandler)
    );


  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
  getStudentsL()
  {
    return [
      {"id": 1401, "name": "Rohita", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1402, "name": "Harshita","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1403, "name": "Bhargav","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1404, "name": "Nourin","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1405, "name": "Sweety", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1406, "name": "Nivetha","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1407, "name": "Darshan", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1408, "name": "Dikshanth","max":30, "assignment": 0, "lab":0, "theory": 0, "attendance":0, "total":0},
      {"id": 1409, "name": "Smruthi", "max":30,"assignment": 0, "lab":0,  "theory": 0, "attendance":0, "total":0},
      {"id": 1410, "name": "Gayatri", "max":30,"assignment": 0, "lab":0, "theory": 0, "attendance":0,"total":0}
    ];
  }
  getColumnValidations()
  {
    return[, 'name', 'assignment', 'theory', 'attendance', 'total']; 
  }
  getColumnsMaths()
  {
    return[{'columnName':'id','maxMarks':null}, {'columnName':'name','maxMarks':null}, {'columnName':'assignment','maxMarks':30}, {'columnName':'theory','maxMarks':60}, {'columnName':'attendance','maxMarks':10}]; 
  }
  getColumnsScience()
  {
    return[{'columnName':'id','maxMarks':null}, {'columnName':'name','maxMarks':null}, {'columnName':'assignment','maxMarks':10}, {'columnName':'theory','maxMarks':60}, {'columnName':'lab','maxMarks':30}];  
  }
  getCourses()
  {
    return[
    {'name':'Btech'},
    {'name':'Mtech'},
    {'name':'MBA'}
  ];
}
}
