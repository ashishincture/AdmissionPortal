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
import { HttpClient } from '@angular/common/http';




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
  CRData;
  semData
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
  };
  CRCountModel;
  selectedIns;
  Institution;
  detVisibility=false;
  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private service: DataServiceService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private fBuilder:FormBuilder,
    private localservice:LocalDataService,
    private http: HttpClient
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
    this.service.getInstitutionList().subscribe((data:any)=>{
      console.log(data);
      this.Institution=data.insArray;
      // for (const d of (data.insArray as any)) {
      //   this.Institution.push({
      //     instituteID: d.instituteID,
      //     instituteName: d.instituteName
      //   });
      // }
    } );

   }

  ngOnInit(): void {
    
    this.CRdetails=this.fBuilder.group({
      Regulation:['',[Validators.required]],
      dept:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      adYear:[],
      semNo:[1,[Validators.required]]
    });
  }
  onFetchInstitute(){
    if(!this.selectedIns){
      alert("Please select an institute");
      return;
    }
    this.service.instid=this.selectedIns;
    this.service.getRegData().subscribe((data:any)=>{

      this.RegSData=data.data.Regulation;
      //this.RegSData.pop();
      //debugger;
      console.log(this.RegSData);
      this.service.RegSData=this.RegSData;
      //this.semData=this.service.semData;
      this.subjecttypes=this.service.subjecttypes;
      // this.deptData=this.service.getDeptData();
      // this.CRData=this.service.getCRData();
    this.detVisibility=true;
    },error=>{
      this.detVisibility=false;
      alert(error.error.error);
      return;
    });
    
    

  }
  ChangeIns(){
    this.detVisibility=false;
    this.selectedIns="";
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
  onSelectVReg(){
    this.service.RegSData=this.RegSData;
    this.deptData=this.RegSData.find(({Regulation_ID})=>Regulation_ID===this.CRdetails.value.Regulation).Department_Details;
 
  }
  onSelectVDept(){
    let deptDetail=this.deptData.find(({Department_ID})=>Department_ID===this.CRdetails.value.dept)
    this.CRData=deptDetail.Curriculum_Details;
    this.semData=deptDetail.Credits_Details;
  }
 
  ViewCR(){
    this.container.clear();
    if (this.CRdetails.invalid) {
      console.log('form invalid');
        return;
    }
    this.service.getCRDetails(this.CRdetails.value.Regulation,this.CRdetails.value.dept,this.CRdetails.value.curriculum).subscribe((data:any)=>{
       let semsubj=data.data.Semester_Data.find(({
        Semester_NO
    })=>Semester_NO===this.CRdetails.value.semNo).Subjects;
    if(semsubj)
    {
      for(var i=0;i<this.subjecttypes.length;i++){
      let typesubj=[];
      for(var j=0;j<semsubj.length;j++){
        if(semsubj[j].Type===this.subjecttypes[i])
          {
            typesubj.push(semsubj[j]);
          }
      }
      this.localservice.setCoreSubjs(typesubj);
      const crViewfactory=this.componentFactoryResolver.resolveComponentFactory(CRcomp1Component);
      let panel=this.container.createComponent(crViewfactory);
      panel.instance.paneltitle=this.subjecttypes[i];
    }
  }
    });
   
    
    
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
    this.service.CRdataModelCreate(this.RegsDataDetails.Semester_Count);
    this.CRCountModel=this.service.CRCountModel;
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
      this.service.CRCountModel[this.CreateCRdetails.value.semNo-1].status="submitted";
      
      this.CreateCRinReg();
      //console.log(this.service.newCRData);
    }
    else {
      console.log("submit CR");
      console.log(this.service.newCRData);
      var a = this.http.post(`${this.service.uri}/curriculum/newcurriculum/${this.service.instid}/${this.service.newCRData.Regulation_ID}/${this.service.newCRData.Department_ID}`,this.service.newCRData);
      a.subscribe((data:any)=>{
      //console.log(data);
      if(data.msg === "success"){
        alert("New Curriculum Added Successfully");
        this.container.clear();
        this.CRdetails=this.fBuilder.group({
          Regulation:['',[Validators.required]],
          dept:['',[Validators.required]],
          curriculum:['',[Validators.required]],
          adYear:[],
          semNo:[1,[Validators.required]]
        });
        this.showForm={
          viewCR:true,
          createCR:false,
          ViewFooter:false
        }
        this.service.getRegData().subscribe((data:any)=>{
          this.RegSData=data.data.Regulation;
          //this.RegSData.pop();
          //debugger;
          //console.log(this.RegSData);
          //console.log(this.RegSData);
          this.service.RegSData=this.RegSData;
        });
        
      }
    });
    }
    
  }

}
