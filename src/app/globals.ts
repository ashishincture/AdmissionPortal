import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

  data = {
    InstitutionId:"",
    InstitutionName: "",
    InstitutionType: "",
    TemplateType: "",
    Colleges: "",
    Departments: "",
    Description: "",
    CollegeDetail: [
    ],
    CollegeQuotas: [
    ],
    DeptDetail: [
    ],
    CourseTemplates: [
      {
        name: "",
        courseTemplate: [
          {
            sub: "",
            id: "",
            Seats: ""
           
          },
          {
            sub: "",
            id: "",
            Seats: ""
          }

        ]

      },

      {
        name: "",
        courseTemplate: [
          {},
          {},
          {}
        ]

      }
    ],

    Verification: {
      documents: []

    },

    AnnouncementFaq: {

    }

  };
}