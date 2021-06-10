import {ChangeDetectorRef, Component, OnDestroy,OnInit,ViewChild,Input,ViewContainerRef,ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray,ReactiveFormsModule } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { DataServiceService,CrClass,ADyear,Department,SubjectClass, DeptCr, SemClass } from '../../data-service.service';
import { CRcomp1Component } from '../crcomp1/crcomp1.component';
import { CreateCRComponent } from './../create-cr/create-cr.component';
import {LocalDataService} from '../../local-data.service';



export interface CrDetailsClass{
  dept:string;
  curriculum:string;
  adYear:string;
  semNo:string;
}

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit,AfterViewInit {
 
  @ViewChild('container', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;
  deptData;
  // CRData:CrClass[]=this.service.getCRData();
  // RegulationData=this.service.regwithCR;
  RegSData;
  RegsDataDetails;
  ADyears:ADyear[]=[];
  CRdetails:any;
  CreateCRdetails:any;
  subjecttypes: string[]=[];
  //semData=this.service.semData;;
  showForm={
    viewCR:true,
    createCR:false,
    ViewFooter:false
  }
  
  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private service: DataServiceService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private fBuilder:FormBuilder,
    private localservice:LocalDataService
  ) {
    // this.service.getDeptSData().subscribe((data:any)=>{
    //   this.deptData=data.data;
    //   //console.log(this.deptData);
    // });
    this.service.getRegData().subscribe((data:any)=>{
      this.RegSData=data.data.Regulation;
      //this.RegSData.pop();
      //debugger;
      console.log(this.RegSData);
      this.service.RegSData=this.RegSData;
    });

   }

  ngOnInit(): void {
    this.CRdetails=this.fBuilder.group({
      dept:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      adYear:['',[Validators.required]],
      semNo:['',[Validators.required]],
    });
    //this.semData=this.service.semData;
    this.subjecttypes=this.service.subjecttypes;
    // this.deptData=this.service.getDeptData();
    // this.CRData=this.service.getCRData();
  }
  ngAfterViewInit(){
    

  }
  onSelectReg(){
    // this.service.getDeptSData(this.CreateCRdetails.value.Regulation).subscribe((data:any)=>{
    //   this.deptData=data.data.Department_Details;
    //   debugger;
    //   //console.log(this.deptData);
    // });
    //this.deptData=this.service.getDeptSData(this.CreateCRdetails.value.Regulation);
    this.service.RegSData=this.RegSData;
    this.deptData=this.RegSData.find(({Regulation_ID})=>Regulation_ID===this.CreateCRdetails.value.Regulation).Department_Details;
  }
  onSelectCR(oEvent: any){
    let CRValue=oEvent.value;
    // var oCr=this.CRData.find(({
    //   code
    // }) => code === CRValue);
    // if(oCr){
    //   this.ADyears=oCr.academicYears;
    // }  

  }
 
  ViewCR(){
    this.container.clear();
    if (this.CRdetails.invalid) {
      console.log('form invalid');
        return;
    }
//aaaaa
    // let Crvalue=this.service.CRData.find(({
    //   code
    // })=>code===this.CRdetails.value.curriculum);
    // let adYearValue=Crvalue?.academicYears.find(({
    //   startYear
    // })=>startYear===this.CRdetails.value.adYear);
    
   
    // let deptvalue=adYearValue?.Departments.find(({
    //   id
    // })=>id===this.CRdetails.value.dept);
    // let semsubj=deptvalue?.sems.find(({
    //   id
    // })=>id===this.CRdetails.value.semNo)?.subjects;
  //   if(semsubj)
  //   {
  //     for(var i=0;i<this.subjecttypes.length;i++){
  //     let typesubj=[];
  //     for(var j=0;j<semsubj.length;j++){
  //       if(semsubj[j].type===this.subjecttypes[i])
  //         {
  //           typesubj.push(semsubj[j]);
  //         }
  //     }
  //     this.localservice.setCoreSubjs(typesubj);
  //     const crViewfactory=this.componentFactoryResolver.resolveComponentFactory(CRcomp1Component);
  //     let panel=this.container.createComponent(crViewfactory);
  //     panel.instance.paneltitle=this.subjecttypes[i];
  //   }
  // }
    
    
  }
  createCR(){
    this.container.clear();
    this.CreateCRdetails=this.fBuilder.group({
      Regulation:['',[Validators.required]],
      dept:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      CRid:['',[Validators.required]],
      adYear:[,[Validators.required]],
      semNo:[1,[Validators.required]],
    });
    this.showForm.createCR=true;
    this.showForm.viewCR=false;
    
    
  }
  CreateCRinReg(){
    
    if(this.CreateCRdetails.invalid){
      console.log("form invalid");
      return;
    }

    this.container.clear();
    this.localservice.coreData=[];
    this.localservice.adStyear=this.CreateCRdetails.value.adYear;
    this.localservice.dept=this.CreateCRdetails.value.dept;
    this.localservice.semid=this.CreateCRdetails.value.semNo;
    this.service.newCRData.Regulation_ID=this.CreateCRdetails.value.Regulation;
    this.service.newCRData.Department_ID=this.CreateCRdetails.value.dept;
    this.service.newCRData.Batch_Year=this.CreateCRdetails.value.adYear;
    this.service.newCRData.Curriculum_Name=this.CreateCRdetails.value.curriculum;
    this.service.newCRData.Curriclum_Code=this.CreateCRdetails.value.CRid;

    this.service.OEcount=0;
    this.service.PEcount=0;
    this.service.coreCount=0;

    // if(!this.RegsDataDetails){
    //   this.RegsDataDetails=this.service.getRegsDetails(this.CreateCRdetails.value.Regulation,this.CreateCRdetails.value.dept);
      
    // }
    //let deptdata=this.service.RegSData.find(({Regulation_ID})=>Regulation_ID===this.service.newCRData.regulationId).Department_Details;
    this.RegsDataDetails= this.deptData.find(({Department_ID})=>Department_ID===this.service.newCRData.Department_ID);
    for(var i=0;i<this.subjecttypes.length;i++){
      this.localservice.subType=this.service.subjecttypes[i];
      let crViewfactory=this.componentFactoryResolver.resolveComponentFactory(CreateCRComponent);
      let panel=this.container.createComponent(crViewfactory);
      panel.instance.subType=this.service.subjecttypes[i]; 
      panel.instance.semNo=this.CreateCRdetails.value.semNo;
    }  
    this.showForm.ViewFooter=true;           
  }
  NextSem(){
    //this.CreateCRdetails.value.semNo++;
    let verifySem=this.service.verifyCRwithReg(this.CreateCRdetails.value.semNo);
    if(!verifySem){
      return false;
    }
    let semlength=parseInt(this.RegsDataDetails.Semester_Count);
    if(this.CreateCRdetails.value.semNo<semlength){
      this.CreateCRdetails.value.semNo++;
      this.service.newCRData.Semester_Data.push({
        Semester_NO:this.CreateCRdetails.value.semNo,
        Subjects:[]
      });
      
      this.CreateCRinReg();
      console.log(this.service.newCRData);
    }
    else {
      console.log("submit CR");
      console.log(this.service.newCRData);
    }
    
  }

}
