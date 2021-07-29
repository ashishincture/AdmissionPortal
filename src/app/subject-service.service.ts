import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as data from '../app/data/subjectData.json';

export interface Contributors {
    sNo: number;
    type_of_evaluation: string;
    total_marks: number;
    individual_contribution: number;
  }

@Injectable({
  providedIn: 'root'
})


export class SubjectService {
  constructor(private http: HttpClient) { }

  getSubjects()
  {
    return (data as any).default;
  }
}
