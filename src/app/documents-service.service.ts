import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
 
  uri:string = 'https://university-mean.herokuapp.com';

 
  constructor(private http: HttpClient) { }
 
  getStudents() {
    //console.log(this.uri);
    return this.http.get(`${this.uri}/student/view`);
  }
  
  getStudentsSearch(sQuery){
    
    return this.http.get(`${this.uri}/student/search/` + sQuery);   
  }
 

}