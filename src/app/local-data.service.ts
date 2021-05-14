import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {SubjectClass,CrClass} from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  coreData:SubjectClass[]=[];
  createCr!:CrClass;
  adStyear!:number;
  dept!:string;
  semid!:string;
  subType!: string;
  constructor() { }
  setCoreSubjs(coreSubjs:SubjectClass[]){
    this.coreData=coreSubjs;
    return this.coreData;
  }
  setcreateCR(crbasic:CrClass){
    this.createCr=crbasic;
    return this.createCr;
  }
}
