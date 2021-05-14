import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Globals} from '../globals'
@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {
   data={
    InstitutionName: "",
    InstitutionClass: "",
    TemplateType: "",
    Colleges: "",
    Departments: "",
    Description:"",
    CollegeDetail:{
        college: "",
        UGC_Reg_ID: "",
        AICTE_Reg_ID: ""
        
      
  
  
  
        },
  
    CourseDetails:{
  
        CourseTemplates:[
            {
              name: "",
              courseTemplate:[
                              
                ]
  
            },
  
            {
              name: "",
              courseTemplate:[
                  
                ]
  
            }
                 ]
  
  
            },
  
    Quotas:[
      { name: "",
          percent: ""
      },
      { name: "",
        percent: ""
      }							
                  ],
                    
          
                  
  
    SeatMatrix:{	
        departments:[
            {
            id: "",
            coursesDegrees:[
                  {
                  id:"",
                  Seats: "",
                  Quotas:[
                    { name: "",
                      percent: ""
                    },
                    { name: "",
                      percent: ""
                    }
                           ],
          
                  },
                  
                  {
                  id:"",
                  Seats: "",
                  Quotas:[
                    { name: "",
                      percent: ""
                    },
                    { name: "",
                      percent: ""
                    }
                           ],
          
                  }
                ]
            },
  
            {
            id: "",
            coursesDegrees:[
                  {
                  id:"",
                  Seats: "",
                  Quotas:[
                    { name: "",
                      percent: ""
                    },
                    { name: "",
                      percent: ""
                    }
                           ],
          
                  },
                                  {
                  id:"",
                  Seats: "",
                  Quotas:[
                    { name: "",
                      percent: ""
                    },
                    { name: "",
                      percent: ""
                    }
                           ],
          
                  }
                ]
            }
        
             ]				
  
          },
  
    Verification:{
        documents:[]
        
           },
  
    AnnouncementFaq:{
                           
                          }
  
  };
  
  
  constructor(public router: Router,public global:Globals) { }
  onPressSubmit(){
    this.router.navigate(['/home']);
    console.log(this.data.Colleges);
  }
  ngOnInit(): void {

    
  }
}
// export

