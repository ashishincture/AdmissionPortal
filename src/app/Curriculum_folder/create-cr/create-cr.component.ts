import {ChangeDetectorRef, Component, OnDestroy,OnInit,ViewChild,Input,ViewContainerRef,ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray,ReactiveFormsModule } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService,CrClass,ADyear,Department,SubjectClass, DeptCr,RegulationClass, CRSubjectClass } from '../../data-service.service';
import {LocalDataService} from '../../local-data.service';
import { SubjDialogComponent } from '../subj-dialog/subj-dialog.component';
import { SubjectService } from '../../subject.service';
import { identifierModuleUrl } from '@angular/compiler';



@Component({
  selector: 'app-create-cr',
  templateUrl: './create-cr.component.html',
  styleUrls: ['./create-cr.component.css']
})
export class CreateCRComponent implements OnInit {
  @Input() subType:string=""; semNo=1;
  //regulation:RegulationClass[]=this.service.RegulationData;
  deptData;
  CRData!: string;
  ADyears:ADyear[]=[];
  CRdetails:any;
  dept!: string;
  subjecttypes: string[]=[];
  data!: SubjectClass[];
  semData: { name: string; }[] | undefined;
  showGroupfield: boolean=false;
  electiveGrp:string="";
  deptSubj;
  RegSemDetails;
  
  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private service: DataServiceService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private fBuilder:FormBuilder,
    private localservice:LocalDataService,
    public dialog: MatDialog,
    private SubjectService: SubjectService
  ) {
    this.subjecttypes=this.service.subjecttypes;
    //this.deptData=this.service.getDeptSData(this.service.newCRData.regulationId);
    // this.service.getRegData().subscribe((data:any)=>{
    //   this.deptData==data.data.Regulation.find(({Regulation_ID})=>Regulation_ID===this.service.newCRData.regulationId).Department_Details;
    // });
    this.deptData=this.service.RegSData.find(({Regulation_ID})=>Regulation_ID===this.service.newCRData.Regulation_ID).Department_Details;
    // this.SubjectService.getSubjectList().
    //   subscribe((data: any) => {
    //     //this.Subjects = data.data;
    //     //this.data = data.data;
    //     this.deptSubj=data.data;
    //     //console.log(data.data);
        
    //   });
      //this.deptSubj=this.deptData.Subject;
    let inputData = this.localservice.coreData;
    if(this.localservice.subType!=='CORE'){
      this.showGroupfield=true;
      this.groupingColumn="Group_Name";
    }
    if(!this.initData(inputData)) return;

    this.buildDataSource();
    let deptDataDetails=this.service.getRegsDetails(this.service.newCRData.Regulation_ID,this.service.newCRData.Department_ID);
    // this.RegSemDetails=deptDataDetails.Credits_Details.find(({sNo})=>sNo===this.semNo);
    let CreditDetails= this.deptData.find(({Department_ID})=>Department_ID===this.service.newCRData.Department_ID);
      this.RegSemDetails=CreditDetails.Credits_Details.find(({sNo})=>sNo===this.semNo);
    // this.service.getRegData().subscribe((data:any)=>{
    //   let RegSData=data.data.Regulation;
    //   //this.RegSData.pop();
    //   //debugger;
    //   let deptdata=RegSData.find(({Regulation_ID})=>Regulation_ID===this.service.newCRData.regulationId).Department_Details;
    //   let CreditDetails= this.deptData.find(({Department_ID})=>Department_ID===this.service.newCRData.deptId);
    //   this.RegSemDetails=CreditDetails.Credits_Details.find(({sNo})=>sNo===this.semNo);
    // });

   }
   displayedColumns: string[] = [];

  dataSource = [];

  groupingColumn!: string;

  reducedGroups: any[] | undefined;

  initialData: any[] = [];


  ngOnInit(): void {
   // debugger;
   let CreditDetails= this.deptData.find(({Department_ID})=>Department_ID===this.service.newCRData.Department_ID);
    this.RegSemDetails=CreditDetails.Credits_Details.find(({sNo})=>sNo===this.semNo);
    this.CRdetails=this.fBuilder.group({
      regulation:['',Validators.required],
      dept:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      adYear:['',[Validators.required]],
      semNo:['',[Validators.required]],
    });
    //this.semData=this.service.semData;
    //this.subjecttypes=this.service.subjecttypes;
    //this.deptData=this.service.getDeptData();
    // let semsubj=this.service.RegulationData.find(({
    //   semid
    // })=>semid===this.localservice.semid);
    //debugger;
   //let subjNo=semsubj?.types.find(({id})id===this.subType);

    
  }
  openSubDiag(oEvent:any){
    //debugger;
    if(this.subType!=="CORE" && this.electiveGrp===""){
      return;
    }
    if(this.subType==="CORE"){
      if(this.dataSource.length===this.RegSemDetails.Core)
      return;
    }
    if(!this.service.verifyCRCreatewithReg(this.semNo,this.subType)){
      return;
    }
    
    let selectDept=oEvent.value;
    let Subjects=[];
    // for(var i=0;i<this.deptSubj.length;i++){
    //   if(this.deptSubj[i].Department_ID===selectDept){
               
    //       if(this.deptSubj[i].Type===this.subType){
    //         Subjects.push(this.deptSubj[i])
         
    //     }
    //   }
    // }
    for(var i=0;i<this.deptData.length;i++){
      if(this.deptData[i].Department_ID===selectDept){
        for(var j=0;j<this.deptData[i].Subject.length;j++){  
              if(this.deptData[i].Subject[j].Type===this.subType){
                Subjects.push(this.deptData[i].Subject[j]);
             
            }
          }
        }
    }

    //
    // this.SubjectService.getSubjectList().
    //   subscribe((data: any) => {
    //     //this.Subjects = data.data;
    //     //this.data = data.data;
    //     deptSubj=data.data;
    //     for(var i=0;i<deptSubj.length;i++){
    //       if(deptSubj[i].Department_ID===selectDept){
           
            
    //           if(deptSubj[i].Type===this.subType){
    //             Subjects.push(deptSubj[i])
              
    //         }
    //       }
    //     }
    //     console.log(data.data);
        
    //   });
    //
    this.data=Subjects;

    // let subjs=this.service.departmentData.filter((value,key)=>{
    //   if(value.code===oEvent.value){let subjects=value?.Subjects}})
    // let sellectDept=oEvent.
    if(this.data.length>0){
      const dialogRef = this.dialog.open(SubjDialogComponent, {
      width:"25rem",
      height:"inherit",
      data:this.data 
    });
  
    let that =this;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        if(this.subType==="CORE"){
          if((result.length+this.dataSource.length)>this.RegSemDetails.Core)
          return;
        }
          let semsub=this.service.newCRData.Semester_Data.find(({
            Semester_NO
          })=>Semester_NO===that.semNo).Subjects;
          
          for(var i=0;i<result.length;i++){
            result[i].Group_Name=this.electiveGrp;
            let num=semsub.findIndex((subj)=>{
              if(subj.Subject_Code===result[i].Subject_Code){
              return true
              }
              })
            if(num !== -1){
             
              result=result.splice(i,0);
              continue;
            }
          }
          
          this.initialData=this.initialData.concat(result);
          this.buildDataSource();
        }
      });
    }
      
    
  }
  initData(data: {}[]){
    if(!data) return false;
    //debugger;
    this.displayedColumns =['Subject_Code','Subject_Name','Type','Credits'];
    this.initialData = this.localservice.coreData;
    // if(this.initialData[0]?.type!=="core"&&this.initialData[0]?.type!==undefined){
    //   this.showGroupfield=true;
    //   this.groupingColumn="groupNme";
    // }
    return true;
  }

  // /**
  //  * Rebuilds the datasource after any change to the criterions
  //  */
  buildDataSource(){
    this.dataSource = this.groupBy(this.groupingColumn,this.initialData,this.reducedGroups);
    this.service.updateCRData(this.initialData,this.semNo);
    if(this.subType!=="CORE"){
      var nGrps=0;
      for(var i=0;i<this.dataSource.length;i++){
        if(this.dataSource[i].isGroup){
        nGrps++;
        }
      }
      if(this.subType==="PE"){
        this.service.PEcount=nGrps;
      }
      else{
        this.service.OEcount=nGrps;
      }
    }
    else{
      this.service.coreCount=this.dataSource.length;
    }
  }
  
  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(column:string,data: any[],reducedGroups?: any[]){
    if(!column) return data;
    let collapsedGroups = reducedGroups;
    if(!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator: { [x: string]: any[]; }, currentValue: { [x: string]: any; }) => {
      let currentGroup = currentValue[column];
      if(!accumulator[currentGroup])
      accumulator[currentGroup] = [{
        groupName: `${currentValue[column]}`,
        value: currentValue[column], 
        isGroup: true,
        reduced: collapsedGroups?.some((group) => group.value == currentValue[column])
      }];
      
      accumulator[currentGroup].push(currentValue);

      return accumulator;
    }
    let groups = data.reduce(customReducer,{});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a,c)=>{return a.concat(c); },[]);

    return flatList.filter((rawLine: { [x: string]: any; isGroup: any; }) => {
        return rawLine.isGroup || 
        collapsedGroups?.every((group) => rawLine[column]!=group.value);
      });
  }

  /**
   * Since groups are on the same level as the data, 
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index: any, item: { isGroup: boolean; }): boolean{
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row: { reduced: boolean; value: any; }){
    row.reduced=!row.reduced;
    if(row.reduced)
      this.reducedGroups?.push(row);
    else
      this.reducedGroups = this.reducedGroups?.filter((el)=>el.value!=row.value);
    
    this.buildDataSource();
  }

}
