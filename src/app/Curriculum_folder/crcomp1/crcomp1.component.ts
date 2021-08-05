import { Component, OnInit,ViewContainerRef,ComponentFactoryResolver, Input ,ViewChild, AfterViewInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray,ReactiveFormsModule } from '@angular/forms';
import { DataServiceService,CrClass,ADyear,Department,SubjectClass } from '../../data-service.service'
import {LocalDataService} from '../../local-data.service'
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crcomp1',
  templateUrl: './crcomp1.component.html',
  styleUrls: ['./crcomp1.component.css']
})
export class CRcomp1Component{
  @Input() TableDate?:SubjectClass[];paneltitle:string ='type';
  @ViewChild('table', { static: true }) table:any;
  
  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private service: DataServiceService,
    private localservice:LocalDataService
    
  ) { 
    let inputData = this.localservice.coreData;

    if(!this.initData(inputData)) return;

    this.buildDataSource();
  }

  displayedColumns: string[] = [];

  dataSource = [];

  groupingColumn!: string;

  reducedGroups: any[] | undefined;

  initialData: any[] = [];

  

  /**
   * Discovers columns in the data
   */
  initData(data: {}[]){
    if(!data) return false;
    //debugger;
    this.displayedColumns =['Subject_Code','Subject_Name','Type','Credits'];
    this.initialData = this.localservice.coreData;
    if(this.initialData.length){
      if(this.initialData[0].Type!=="CORE"){
        this.groupingColumn="Group_Name";
      }
    }
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
