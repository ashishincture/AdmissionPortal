import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.component.html',
  styleUrls: ['./regulation.component.css']
})
export class RegulationComponent implements OnInit {
  regulations;
  CRCountModel;
  selectedIns;
  Institution;
  detVisibility=false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service:DataService
    ) { 
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
    // this.fetchRegulation(); 
  }
  fetchRegulation(){
    this.service.getRegulationData().
    subscribe((data:any)=>{
      console.log(data.data.Regulation);
      this.regulations=data.data.Regulation;
      this.detVisibility=true;
    },error=>{
      this.detVisibility=true;
      this.regulations = [];
      alert(error.error.error);
    });
    
  }
  onRegulationPress(data){
    this.service.RId = data;
    // this.service.getRegulationDatabyID(data);
    this.router.navigate(['regulationdetail']);
    console.log(data);
  }
  onAddRegulation(){
    this.service.eidtFlag = false;
    this.router.navigate(['add']);
    console.log("add");
    this.service.getAllDeps().subscribe((data:any)=>{
    console.log(data.data[0].courseDetails);
    let coursearray = [];
    var coursedetails = data.data[0].courseDetails;
    for(var i=0;i<coursedetails.length;i++){
    let courseobj = {
      courseid:coursedetails[i].Course_id,
      coursename:coursedetails[i].Course_name
    }
    coursearray.push(courseobj);
    }
    console.log(coursearray);
    this.service.allDeps=coursearray;
    });
  }
  onFetchInstitute(){
    if(!this.selectedIns){
      alert("Please select an institute");
      return;
    }
    this.service.instid=this.selectedIns;
    this.fetchRegulation();
    // this.service.getRegData().subscribe((data:any)=>{

      // this.RegSData=data.data.Regulation;
      //this.RegSData.pop();
      //debugger;
      // console.log(this.RegSData);
      // this.service.RegSData=this.RegSData;
      // //this.semData=this.service.semData;
      // this.subjecttypes=this.service.subjecttypes;
      // this.deptData=this.service.getDeptData();
      // this.CRData=this.service.getCRData();
    // this.detVisibility=true;
    // },error=>{
    //   this.detVisibility=false;
    //   alert(error.error.error);
    //   return;
    // });
  }
  ChangeIns(){
    this.detVisibility=false;
    this.selectedIns="";
  }

}
