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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service:DataService
    ) { }

  ngOnInit(): void {
    this.fetchRegulation();
    
  }
  fetchRegulation(){
    this.service.getRegulationData().
    subscribe((data:any)=>{
      this.regulations=data.data;
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
  }

}
