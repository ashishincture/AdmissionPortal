import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contributors } from '../subject-service.service';

export interface DefaultContributors {
    total_marks: number,
    _id: string,
    sNo: number,
    type_of_evaluation: string,
    individual_contribution: number
}

export interface DefaultSubject {
    _id: string,
    subject_type: string,
    total_marks_subject: number,
    passing_percentage: string,
    subject_contributors: DefaultContributors[],
    __v: number
}


//payload
export interface DefaultSubjectUpdateParam {
    subject_type: string
}

export interface DefaultSubjectPayload {
    _id: string,
    subject_type: string,
    total_marks_subject: number,
    passing_percentage: string,
    subject_contributors: Contributors[],
    __v: number
}

export interface NewDefaultSubjectPayload {
    subject_type: string,
    total_marks_subject: number,
    passing_percentage: string,
    subject_contributors: Contributors[]
}

@Injectable({
    providedIn: 'root'
})
export class ApiServiceSkeletonDefault {

    constructor(private http: HttpClient) { }

    getSubjectSkeletonDefaults(): Observable<any> {
        return (this.http.get("https://university-app-2021.herokuapp.com/subjectSkeletons/getSubjectSkeletonByDefaults"))
    }

    addSubjectDefaultSkeleton(payload: NewDefaultSubjectPayload): Observable<any> {
        var url = "https://university-app-2021.herokuapp.com/subjectSkeletons/addSubjectSkeletons";
        return (this.http.post(url, payload));
    }

    updateSubjectDefaultSkeleton(payload: DefaultSubjectPayload, param: DefaultSubjectUpdateParam): Observable<any> {
        var url = "https://university-app-2021.herokuapp.com/subjectSkeletons/updateSubjectSkeletons/" + param.subject_type;
        return (this.http.put(url, payload));
    }
}
