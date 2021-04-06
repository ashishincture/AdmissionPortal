import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

    data={
        InstitutionName: "",
        InstitutionType: "",
        TemplateType: "",
        Colleges: "",
        Departments: "",
        Description:"",
        CollegeDetail:[{
            college: "School Of Engineering",
            UGC_Reg_ID: "",
            AICTE_Reg_ID: ""
          },
          {
            college: "School Of Management",
            UGC_Reg_ID: "",
            AICTE_Reg_ID: ""
          },
          {
            college: "School Of Legal Studies",
            UGC_Reg_ID: "",
            AICTE_Reg_ID: ""
          },
          {
            college: "College of Pure Sciences",
            UGC_Reg_ID: "",
            AICTE_Reg_ID: ""
          }],
      
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
}