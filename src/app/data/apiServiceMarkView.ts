import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces for Data sources

export interface branchListPayload {
  ins_id: string,
  cor_id: string
}

export interface courseListPayload {
  ins_id: string
}

export interface regulationsPayload {
  ins_id: string
}

export interface departmentPayload {
  ins_id: string,
  reg_id: string
}
export interface curriculumPayload {
  ins_id: string,
  reg_id: string,
  dep_id: string
}
export interface semesterPayload {
  ins_id: string,
  reg_id: string,
  dep_id: string,
  cur_no: string
}
const localUrlBranch = 'https://university-app-2021.herokuapp.com/institute/branchList';
const localUrlCourse = 'https://university-app-2021.herokuapp.com/institute/courses/';
const localUrlGetAllInstitutes = ' https://university-app-2021.herokuapp.com/institute/all/';
const localUrlRegulation = 'https://university-app-2021.herokuapp.com/Regulation/all';
const localUrlDepartment = 'https://university-app-2021.herokuapp.com/Regulation/departments';
const localUrlCurriculum = 'https://university-app-2021.herokuapp.com/Regulation/departments/curriculums';
const localUrlSemester = 'https://university-app-2021.herokuapp.com/institute/semesters/';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  getBranchList(payload: branchListPayload): Observable<any> {
    return (this.http.post(localUrlBranch, payload));
  }
  getCourseList(payload: courseListPayload): Observable<any> {
    return this.http.post(localUrlCourse, payload);
  }
  getAllInstituteList(): Observable<any> {
    return (this.http.get(localUrlGetAllInstitutes));
  }
  getRegulationsList(payload: regulationsPayload): Observable<any> {
    return (this.http.post(localUrlRegulation, payload));
  }
  getDepartmentsList(payload: departmentPayload): Observable<any> {
    return (this.http.post(localUrlDepartment, payload));
  }
  getCurriculumList(payload: curriculumPayload): Observable<any> {
    return (this.http.post(localUrlCurriculum, payload));
  }
  getSemesterList(payload: semesterPayload): Observable<any> {
    return (this.http.post(localUrlSemester, payload));
  }
}
