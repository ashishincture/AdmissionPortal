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



@Component({
  selector: 'app-create-cr',
  templateUrl: './create-cr.component.html',
  styleUrls: ['./create-cr.component.css']
})
export class CreateCRComponent implements OnInit {
  @Input() subType:string=""; semNo=1;
  regulation:RegulationClass[]=this.service.RegulationData;
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
    this.service.getDeptSData().subscribe((data:any)=>{
      this.deptData=data.data;
      //console.log(this.deptData);
    });

    this.SubjectService.getSubjectList().
      subscribe((data: any) => {
        //this.Subjects = data.data;
        //this.data = data.data;
        this.deptSubj=data.data;
        //console.log(data.data);
        
      });
    let inputData = this.localservice.coreData;
    if(this.localservice.subType!=='Core'){
      this.showGroupfield=true;
      this.groupingColumn="groupNme";
    }
    if(!this.initData(inputData)) return;

    this.buildDataSource();
    this.service.getRegsDetails(this.service.newCRData.regulationId).subscribe((data:any)=>{
      let regData=data.data;
      let deptDataDetails=regData.Department_Details.find(({
        Department_ID
      })=>Department_ID===this.service.newCRData.deptId);
      this.RegSemDetails=deptDataDetails.Credits_Details.find(({sNo})=>sNo===this.semNo);
    });

   }
   displayedColumns: string[] = [];

  dataSource = [];

  groupingColumn!: string;

  reducedGroups: any[] | undefined;

  initialData: any[] = [];


  ngOnInit(): void {
   // debugger;
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
    let semsubj=this.service.RegulationData.find(({
      semid
    })=>semid===this.localservice.semid);
    //debugger;
   //let subjNo=semsubj?.types.find(({id})id===this.subType);

    
  }
  openSubDiag(oEvent:any){
    //debugger;
    if(this.subType!=="Core" && this.electiveGrp===""){
      return;
    }
    if(this.subType==="Core"){
      if(this.dataSource.length===this.RegSemDetails.Core)
      return;
    }
    
    let selectDept=oEvent.value;
    let Subjects=[];
    for(var i=0;i<this.deptSubj.length;i++){
      if(this.deptSubj[i].Department_ID===selectDept){
               
          if(this.deptSubj[i].Type===this.subType){
            Subjects.push(this.deptSubj[i])
         
        }
      }
      //innu
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
      data:this.data 
    });
  
    let that =this;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
          let semsub=this.service.newCRData.semData.find(({
            sem
          })=>sem===that.semNo).subjects;
          
          for(var i=0;i<result.length;i++){
            result[i].groupNme=this.electiveGrp;
            let num=semsub.findIndex((subj)=>{
              if(subj.Subject_ID===result[i].Subject_ID){
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
    this.displayedColumns =['Subject_ID','Subject_Name','Type','Credit'];
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
