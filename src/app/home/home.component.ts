import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  uri: string = ' https://university-app-2021.herokuapp.com/institute/add';
  uri2: string = 'https://university-app-2021.herokuapp.com/counselling/add';
  public CollegeCourses=[];
  public DeptCourses=[];
  public colorToggle: string;
  public backGroundToggle: string;
  ngOnInit(): void {
    this.colorToggle = '#3f3a64';
    this.backGroundToggle = '#3f3a64';
  }

  data: string = 'hello';
  public show: boolean = false;
  public show2: boolean = false;
  public buttonName: any = 'Show';
  public buttonName2: any = 'Show2';

  dataTemplate2 = {
    Course_id: '',
    Course_name: '',
    Course_description: '',
    AICTE_Reg_ID: '',
    UGC_Reg_ID: '',
    Course_type: '',
    Seats: '',
    Course_duration: '',
    Quotas: [],
  };
  dataTemplate = {
    college: '',
    collegeCode: '',
    courseTemplate: '',
    Description: '',
    OwnershipType: '',
    collegeStrength: '',
    established: '',
    UGC_Reg_ID: '',
    AICTE_Reg_ID: '',
    SubjectListCollege: [],
  };
  dataTemplateDep = {
    dept: '',
    deptCode: '',
    courseTemplate: '',
    Description: '',
    OwnershipType: '',
    deptStrength: '',
    established: '',
    UGC_Reg_ID: '',
    AICTE_Reg_ID: '',
    SubjectListDept: [],
  };
  constructor(
    public router: Router,
    public global: Globals,
    public http: HttpClient,
    private toastr: ToastrService

  ) {}
  onPressAddSubject() {
    this.dataTemplate.SubjectListCollege.push(this.dataTemplate2);
    this.dataTemplate2 = {
      Course_id: '',
      Course_name: '',
      Course_description: '',
      AICTE_Reg_ID: '',
      UGC_Reg_ID: '',
      Course_type: '',
      Seats: '',
      Course_duration: '',
      Quotas: [],
    };
    this.toastr.success('Course Registered', 'Success');
    this.toggle();
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show){ this.buttonName = 'Hide';
    // var element = document.getElementById('dynamicRes');
    // element.classList.remove('classRes'); 
  }
    else {this.buttonName = 'Show';
    // var element = document.getElementById('dynamicRes');
    // element.classList.add('classRes'); 
  }

  }
  onPressAddSubject2() {
    this.dataTemplateDep.SubjectListDept.push(this.dataTemplate2);
    this.dataTemplate2 = {
      Course_id: '',
      Course_name: '',
      Course_description: '',
      AICTE_Reg_ID: '',
      UGC_Reg_ID: '',
      Course_type: '',
      Seats: '',
      Course_duration: '',
      Quotas: [],
    };
    this.toastr.success('Course Registered', 'Success');
    this.toggle2();
  }
  toggle2() {
    this.show2 = !this.show2;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show2) this.buttonName2 = 'Hide2';
    else this.buttonName2 = 'Show2';
  }
  onPressSubmit() {
    this.global.data.CollegeDetail.push(this.dataTemplate);
    let univ = this.http.post(`${this.uri}`, {
      Institution_id: this.dataTemplate.collegeCode,
      University_id: this.global.data.InstitutionId,
      Institution_name: this.dataTemplate.college,
      Institution_strength: this.dataTemplate.collegeStrength,
      AICTE_Reg_ID: this.dataTemplate.AICTE_Reg_ID,
      UGC_Reg_ID: this.dataTemplate.UGC_Reg_ID,
      Institution_description: this.dataTemplate.Description,
      Institution_type: 'College',
      Institution_template: this.dataTemplate.courseTemplate,
      Institution_established: this.dataTemplate.established,
      ownershipType: this.dataTemplate.OwnershipType,
      courseDetails: this.dataTemplate.SubjectListCollege,
    });
    this.toastr.success('College Added', 'Success');
    univ.subscribe((data: any) => console.log(data));
    // this.CollegeCourses=this.dataTemplate.SubjectListCollege;
    // for(var i=0;i<this.dataTemplate.SubjectListCollege.length;i++){
    //   this.uri2=this.uri2+"/"+this.global.data.InstitutionId+"/"+this.dataTemplate.SubjectListCollege[i].Course_type;
    //   let univ2 = this.http.post<any>(`${this.uri2}`,{});
    //   univ2.subscribe((data: any) => console.log(data));
    // }
    
   
    this.dataTemplate = {
      college: '',
      collegeCode: '',
      courseTemplate: '',
      Description: '',
      OwnershipType: '',
      collegeStrength: '',
      established: '',
      UGC_Reg_ID: '',
      AICTE_Reg_ID: '',
      SubjectListCollege: [],
    };
  }
  onPressSubmitDept() {
    this.global.data.DeptDetail.push(this.dataTemplateDep);
    let univ = this.http.post(`${this.uri}`, {
      Institution_id: this.dataTemplateDep.deptCode,
      University_id: this.global.data.InstitutionId,
      Institution_name: this.dataTemplateDep.dept,
      Institution_strength: this.dataTemplateDep.deptStrength,
      AICTE_Reg_ID: this.dataTemplateDep.AICTE_Reg_ID,
      UGC_Reg_ID: this.dataTemplateDep.UGC_Reg_ID,
      Institution_description: this.dataTemplateDep.Description,
      Institution_type: 'College',
      Institution_template: this.dataTemplateDep.courseTemplate,
      Institution_established: this.dataTemplateDep.established,
      ownershipType: this.dataTemplateDep.OwnershipType,
      courseDetails: this.dataTemplateDep.SubjectListDept,
    });
    this.toastr.success('Department Added', 'Success');
    univ.subscribe((data: any) => console.log(data));
    // this.DeptCourses=this.dataTemplateDep.SubjectListDept;
    // for(var i=0;i<this.dataTemplateDep.SubjectListDept.length;i++){
    //   this.uri2=this.uri2+"/"+this.global.data.InstitutionId+"/"+this.dataTemplateDep.SubjectListDept[i].Course_type;
    //   let univ2 = this.http.post<any>(`${this.uri2}`,{});
    //   univ2.subscribe((data: any) => console.log(data));
    // }
    this.dataTemplateDep = {
      dept: '',
      deptCode: '',
      courseTemplate: '',
      Description: '',
      OwnershipType: '',
      deptStrength: '',
      established: '',
      UGC_Reg_ID: '',
      AICTE_Reg_ID: '',
      SubjectListDept: [],
    };
  }
}
