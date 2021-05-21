import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
 
  randomdata;

  uri:string =  'https://university-app-2021.herokuapp.com';

 
  constructor(private http: HttpClient) { }
 
  getStudents() {
    //console.log(this.uri);
    return this.http.get(`${this.uri}/student/view`);
  }
  
  getStudentsSearch(sQuery){
    
    return this.http.get(`${this.uri}/student/search/` + sQuery);   
  }

  approveStudentUpdate(sId: String, data:any){
    return this.http.put(`${this.uri}/student/update/`+sId, data);
  }

 

}