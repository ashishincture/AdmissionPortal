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
}
