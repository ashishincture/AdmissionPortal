import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  uri:string = 'https://university-app-2021.herokuapp.com';

  constructor(private http: HttpClient) { }

  getRegulation() {
    //console.log(this.uri);
    return this.http.get(`${this.uri}/Regulation/getregulation/IN0010`);
  }

  getDepartment() {
    return this.http.get(`${this.uri}/Regulation/getdepartmentdetailsbyid/IN0010/R1`);
  }

  getDepartmentByRegId(ID:any){
    return this.http.get(`${this.uri}/Regulation/`+ID);
  }

  getSubjectList(data:any) {
    return this.http.get(`${this.uri}/Subject/getsubject/IN0010/R1/`+data);
  }

  createSubject(data:any){
      return this.http.post(`${this.uri}/Subject/NewSubject`, data);
  }

  updateSubject(subject_ID:string,data:any){
    return this.http.put(`${this.uri}/Subject/UpdateSubject/`+subject_ID, data);
}
 createSubjectBulkUpload(data:any){
  return this.http.post(`${this.uri}/Subject/addsubject/IN0010/R1/CR0001`, data);
 }
}

