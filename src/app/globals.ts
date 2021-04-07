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
    CollegeDetail: [{
      college: "School Of Engineering",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: "",
      courseTemplate: "",
    }
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
    DeptDetail: [{
      dept: "Photonics",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: "",
      courseTemplate: {
        sub: "",
        id: "",
        Seats: "",
        Quotas: [
          {
            name: "",
            percent: ""
          },
          {
            name: "",
            percent: ""
          }
        ]
      }
    },
    {
      dept: "Environmental Studies",
      UGC_Reg_ID: "",
      AICTE_Reg_ID: "",
      courseTemplate: {
        sub: "",
        id: "",
        Seats: "",
        Quotas: [
          {
            name: "",
            percent: ""
          },
          {
            name: "",
            percent: ""
          }
        ]
      }
    }
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