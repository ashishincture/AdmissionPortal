import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  uri:string = 'https://hidden-sierra-56427.herokuapp.com';

  constructor(private http: HttpClient) { }

  getRegulation() {
    //console.log(this.uri);
    return this.http.get(`${this.uri}/Regulation`);
  }

  getDepartment() {
    return this.http.get(`${this.uri}/Department`);
  }

  getSubjectList() {
    return this.http.get(`${this.uri}/Subject`);
  }

  createSubject(data:any){
      return this.http.post(`${this.uri}/Subject/NewSubject`, data);
  }

  updateSubject(subject_ID:string,data:any){
    return this.http.put(`${this.uri}/Subject/UpdateSubject/`+subject_ID, data);
}
 createSubjectBulkUpload(data:any){
  return this.http.post(`${this.uri}/Subject/MultipleSubject`, data);
 }
}

