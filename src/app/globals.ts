import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

  data = {
    InstitutionName: "",
    InstitutionType: "",
    TemplateType: "",
    Colleges: "",
    Departments: "",
    Description: "",
    CollegeDetail: [
    ],
    CollegeQuotas: [
      {
        name: "",
        percent: ""
      },
      {
        name: "",
        percent: ""
      }
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