import { core } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SubjectClass {
  code: string;
  id: string;
  type:string;
  name:string;
  description:string;
  credits:number;
}
export interface CRSubjectClass {
  code: string;
  id: string;
  type:string;
  name:string;
  description:string;
  credits:number;
  groupNme:string;
}
export interface SemClass{
  id:string;
  subjects:CRSubjectClass[];
}
export interface DeptCr{
  id:string;
  sems:SemClass[];
}
export interface ADyear{
  startYear:number;
  endYear:number;
  Departments:DeptCr[];
}
export interface CrClass {
  code: string;
  id: string;
  academicYears:ADyear[];
}
export interface Department{
  code:string;
  description:string;
  Subjects:SubjectClass[];
 }
 export interface RegulationClass{
   semid:string;
   types:typeClass[];
   totalcredits:number;
 }
 export interface typeClass{
   id:string;
   no:number;
 }
 export interface crinReg{
   regulationid:string;
   crs:string[];
 }

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {
  // subjectsData:SubjectClass[]=[
  //   {code:'01',id:'subject01'},
  //   {code:'02',id:'subject02'},
  //   {code:'03',id:'subject03'},
  //   {code:'04',id:'subject04'},
  //   {code:'05',id:'subject05'}
  // ];
  RegulationData:RegulationClass[]=[
    {semid:'sem1',totalcredits:24,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem2',totalcredits:30,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem3',totalcredits:26,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem4',totalcredits:32,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem5',totalcredits:28,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem6',totalcredits:31,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem7',totalcredits:18,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]},
    {semid:'sem8',totalcredits:20,types:[
      {id:'core',no:4},
      {id:'Elective1',no:2},
      {id:'Elective2',no:1}
    ]}
  ];
  regwithCR:crinReg[]=[{
    regulationid:'r15',crs:['CR01','CR02']
  }];
  subjecttypes=['core','Elective1','Elective2'];
  semData=[{'name':'sem1'},{'name':'sem2'},{'name':'sem3'},{'name':'sem4'},{'name':'sem5'},{'name':'sem6'},{'name':'sem7'},{'name':'sem8'}]
  departmentData:Department[]=[
    {code:'Dept01',description:'description of Department 01',
    Subjects:[
      {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01',credits:3}
    ]},
    {code:'Dept02',description:'description of Department 02',
    Subjects:[
      {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01',credits:3},
      {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01',credits:3}
    ]}
  ];
  CRData:CrClass[]=[
    {code:'CR01',id:'01',
    academicYears:[
      {startYear:2012,endYear:2016,
      Departments:[
       { id:'Dept01',sems:[
         {id:'sem1',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem2',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem3',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem4',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem5',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem6',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem7',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]},
         {id:'sem8',subjects:[
          {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
          {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
          {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
          {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
          {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
         ]}
       ]},
       { id:'Dept02',sems:[
        {id:'sem1',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem2',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem3',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem4',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem5',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem6',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem7',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]},
        {id:'sem8',subjects:[
         {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
         {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
         {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
         {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
         {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
        ]}
      ]}
      ]}
    ]},
    {code:'CR02',id:'02',
    academicYears:[
      
      {startYear:2005,endYear:2009,
        Departments:[
          { id:'Dept01',sems:[
            {id:'sem1',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem2',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem3',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem4',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem5',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem6',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem7',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem8',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]}
          ]},
          { id:'Dept02',sems:[
           {id:'sem1',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem2',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem3',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem4',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem5',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem6',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem7',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem8',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]}
         ]}
         ]},
      {startYear:2006,endYear:2010,
        Departments:[
          { id:'Dept01',sems:[
            {id:'sem1',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem2',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem3',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem4',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem5',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem6',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem7',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]},
            {id:'sem8',subjects:[
             {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
             {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
             {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
             {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
             {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
            ]}
          ]},
          { id:'Dept02',sems:[
           {id:'sem1',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem2',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem3',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem4',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem5',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem6',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem7',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]},
           {id:'sem8',subjects:[
            {code:'01',id:'subj01',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'02',id:'subj02',type:'core',name:'subject01',description:'desc of subj 01',credits:3,groupNme:''},
            {code:'03',id:'subj03',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'03',id:'subj07',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE1'},
            {code:'04',id:'subj04',type:'Elective1',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'PE2'},
            {code:'05',id:'subj05',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept2',credits:3,groupNme:'OE1'},
            {code:'06',id:'subj06',type:'Elective2',name:'subject01',description:'desc of subj 01 from dept 2',credits:3,groupNme:'OE2'}
           ]}
         ]}
         ]}
    ]}];
  
  constructor() { }
  getDeptData():Department[]{
    return this.departmentData;
  }
  getCRData():CrClass[]{
    return this.CRData;
  }
}
