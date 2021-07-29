import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces for Data Sources (Dropdowns, Tables) - Skeleton Configure
export interface Institutes {
    instituteID: string
    instituteName: string
}

export interface Regulation {
    instituteId: string
    regulationId: string,
    regulationName: string
}

export interface Department {
    instituteId: string
    regulationId: string,
    departmentId: string,
    departmentName: string
}

export interface Curriculum {
    instituteId: string,
    regulationId: string,
    departmentId: string,
    curriculumId: string,
    curriculumName: string
}

export interface Semester {
    instituteId: string,
    regulationId: string,
    departmentId: string,
    curriculumId: string,
    semesterNo: number
}

export interface Contributors {
    sNo: number;
    type_of_evaluation: string;
    total_marks: number;
    individual_contribution: number;
}

export interface EvaluationCriteria {
    subject_type: string;
    total_marks_subject: number;
    passing_percentage: number;
    subject_contributors: Contributors[];
}

export interface Subject {
    _id: string,
    Subject_Code: string,
    Subject_Name: string,
    Type: string,
    Credits: number,
    Description: string,
    Group_Name: string,
    evalCriteria: EvaluationCriteria
}

export interface RegulationPayload {
    ins_id: string
}

export interface DepartmentPayload {
    ins_id: string,
    reg_id: string
}

export interface CurriculumPayload {
    ins_id: string,
    reg_id: string,
    dep_id: string
}

export interface SemesterPayload {
    ins_id: string,
    reg_id: string,
    dep_id: string,
    cur_no: string
}

export interface SubjectPayload {
    ins_id: string,
    reg_id: string,
    dep_id: string,
    cur_no: string,
    sem_no: string
}
export interface UpdateSubjectParam {
    ins_id: string,
    reg_id: string,
    dep_id: string,
    cur_no: string,
    sem_no: string,
    subject_id: string
}

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class DropdownService {

    constructor(private http: HttpClient) { }

    getInstituteDropdown(): Observable<any> {
        return (this.http.get("https://university-app-2021.herokuapp.com/institute/all/"))
    }

    getRegulationDropdown(payload: RegulationPayload): Observable<any> {
        return (this.http.post("https://university-app-2021.herokuapp.com/Regulation/all/", payload));
    }

    getDepartmentDropdown(payload: DepartmentPayload): Observable<any> {
        return (this.http.post("https://university-app-2021.herokuapp.com/Regulation/departments/", payload));
    }

    getCurriculumDropdown(payload: CurriculumPayload): Observable<any> {
        return (this.http.post("https://university-app-2021.herokuapp.com/Regulation/departments/curriculums/", payload));
    }

    getSemesterDropdown(payload: SemesterPayload): Observable<any> {
        return (this.http.post("https://university-app-2021.herokuapp.com/institute/semesters/", payload));
    }

    getSubjectDropdown(payload: SubjectPayload): Observable<any> {
        return (this.http.post("https://university-app-2021.herokuapp.com/institute/subjects/", payload));
    }

    submitSubjectDetails(payload: EvaluationCriteria, params: UpdateSubjectParam): Observable<any> {
        var url = "https://university-app-2021.herokuapp.com/Subject/saveSkeletonToSubject/";
        url = url + params.ins_id + "/" + params.reg_id + "/" + params.dep_id + "/" + params.cur_no + "/" + params.sem_no + "/" + params.subject_id;
        return (this.http.patch(url, payload));
    }
    
}