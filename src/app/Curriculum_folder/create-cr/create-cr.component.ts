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
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-create-cr',
  templateUrl: './create-cr.component.html',
  styleUrls: ['./create-cr.component.css']
})
export class CreateCRComponent implements OnInit {
  @Input() subType:string="";
  regulation:RegulationClass[]=this.service.RegulationData;
  deptData: Department[] = this.service.getDeptData();
  CRData!: string;
  ADyears:ADyear[]=[];
  CRdetails:any;
  dept!: string;
  subjecttypes: string[]=[];
  data!: SubjectClass[];
  semData: { name: string; }[] | undefined;
  showGroupfield: boolean=false;
  electiveGrp:string="";
  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private service: DataServiceService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private fBuilder:FormBuilder,
    private localservice:LocalDataService,
    public dialog: MatDialog
  ) {
    this.subjecttypes=this.service.subjecttypes;
    this.deptData=this.service.getDeptData();
    let inputData = this.localservice.coreData;
    if(this.localservice.subType!=='core'){
      this.showGroupfield=true;
      this.groupingColumn="groupNme";
    }
    if(!this.initData(inputData)) return;

    this.buildDataSource();

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
    this.deptData=this.service.getDeptData();
    let semsubj=this.service.RegulationData.find(({
      semid
    })=>semid===this.localservice.semid);
    //debugger;
   //let subjNo=semsubj?.types.find(({id})id===this.subType);

    
  }
  openSubDiag(oEvent:any){
    //debugger;
    let selectDept=oEvent.value;
    const deptSubj=this.service.departmentData;
    let Subjects=[];
    for(var i=0;i<deptSubj.length;i++){
      if(deptSubj[i].code===selectDept){
       
        for(var j=0;j<deptSubj[i].Subjects.length;j++){
          if(deptSubj[i].Subjects[j].type===this.subType){
            Subjects.push(deptSubj[i].Subjects[j])
          }
        }
      }
    }
    this.data=Subjects;

    // let subjs=this.service.departmentData.filter((value,key)=>{
    //   if(value.code===oEvent.value){let subjects=value?.Subjects}})
    // let sellectDept=oEvent.
    const dialogRef = this.dialog.open(SubjDialogComponent, {
      width:"25rem",
      data:this.data 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      debugger;
      for(var i=0;i<result.length;i++){
        result[i].groupNme=this.electiveGrp;
      }
      this.initialData=this.initialData.concat(result);
      this.buildDataSource();

      });
      
    
  }
  initData(data: {}[]){
    if(!data) return false;
    //debugger;
    this.displayedColumns =['code','id','name','type','credits'];
    this.initialData = this.localservice.coreData;
    // if(this.initialData[0]?.type!=="core"&&this.initialData[0]?.type!==undefined){
    //   this.showGroupfield=true;
    //   this.groupingColumn="groupNme";
    // }
    return true;
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(){
    this.dataSource = this.groupBy(this.groupingColumn,this.initialData,this.reducedGroups);
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
