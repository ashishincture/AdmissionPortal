import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../data/apiServiceMarkView';
import { branchListPayload, courseListPayload, regulationsPayload, departmentPayload, curriculumPayload, semesterPayload } from '../data/apiServiceMarkView';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component'
import { ApiServiceSkeletonDefault } from '../data/apiServiceSkeletonDefault';

interface STUDENTS_DATA {
  RegistrationID: string;
  studentName: string;
  CGPA: number;
  isExpanded: boolean;
  institute_id: string,
  institute: string;
  regulation: string;
  curriculum: string;
  department: string;
  semester: string;
  course: string;
  semesterData: [
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    },
    {
      "semesterNo": number,
      "SGPA": number,
      "isExpanded": boolean,
      "subject1": {
        "name": string,
        "marks": number
      },
      "subject2": {
        "name": string,
        "marks": number
      },
      "subject3": {
        "name": string,
        "marks": number
      }
    }
  ]

}

interface BATCH {
  Batch: string;
}

@Component({
  selector: 'app-marks-view',
  templateUrl: './marks-view.component.html',
  styleUrls: ['./marks-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MarksViewComponent implements OnInit {

  isTableExpanded = false;
  defaultSubjects: any;
  selectedCourse: string = '';
  selectedStream: string = '';
  selectedBatch: string = '';
  selectedSection: string = '';
  selectedSemester: string = '';
  selectedCurriculum: string = '';
  selectedDepartment: string = '';
  selectedRegulation: string = '';
  selectedInstitute: string = '';

  studentInstitute: string = '';
  studentRegulation: string = '';
  studentCourse: string = ''; //holding the value of the selected course. Used for reseting the filter.
  studentDepartment: string = '';
  studentCurriculum: string = '';
  studentSemester: string = '';
  defaultSubjectSelection: string = '';

  semesters: any = [];
  curriculums: any = [];
  departments: any = [];
  regulations: any = [];
  institutes: any = [];
  courses: any = [];
  streams: any = [];
  batches: BATCH[] = [{
    "Batch": "2016-20"
  }, {
    "Batch": "2017-21"
  }, {
    "Batch": "2018-22"
  }, {
    "Batch": "2019-23"
  },];

  students: STUDENTS_DATA[] = [
    {
      "RegistrationID": "INC01346",
      "studentName": "Dikshant",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "IIT",
      "regulation": "I1",
      "curriculum": "CR02",
      "department": "Information Technology",
      "semester": "1",
      "course": "B.Tech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    },
    {
      "RegistrationID": "INC01347",
      "studentName": "Aditya Padhi",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "PSG ARTS",
      "regulation": "R1",
      "curriculum": "CR03",
      "department": "Computer Science Engineering",
      "semester": "2",
      "course": "B.Tech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    },
    {
      "RegistrationID": "INC01348",
      "studentName": "Ananya Mishra",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "PSG ARTS",
      "regulation": "R1",
      "curriculum": "CR03",
      "department": "Data Science Engineering",
      "semester": "1",
      "course": "B.Tech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    },
    {
      "RegistrationID": "INC01349",
      "studentName": "Abhishek Mishra",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "PSG ARTS",
      "regulation": "R1",
      "curriculum": "CR03",
      "department": "Mechanical Engineering",
      "semester": "2",
      "course": "Mtech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    },
    {
      "RegistrationID": "INC01350",
      "studentName": "Smruti Padhi",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "PSG ARTS",
      "regulation": "R1",
      "curriculum": "CR03",
      "department": "Electrical Engineering",
      "semester": "1",
      "course": "Mtech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    },
    {
      "RegistrationID": "INC01346",
      "studentName": "Srinibas Mishra",
      "CGPA": 8.8,
      "isExpanded": false,
      "institute_id": "IN0010",
      "institute": "PSG ARTS",
      "regulation": "R1",
      "curriculum": "CR03",
      "department": "Information Technology",
      "semester": "1",
      "course": "Mtech",
      "semesterData": [
        {
          "semesterNo": 1,
          "SGPA": 8.5,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 2,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 3,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 4,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 5,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 6,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 7,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        },
        {
          "semesterNo": 8,
          "SGPA": 9.2,
          "isExpanded": false,
          "subject1": {
            "name": "Physics",
            "marks": 98
          },
          "subject2": {
            "name": "Maths",
            "marks": 86
          },
          "subject3": {
            "name": "Chemistry",
            "marks": 91
          }
        }
      ]
    }
  ]

  public dataStudentsList: MatTableDataSource<STUDENTS_DATA> = new MatTableDataSource(this.students);
  displayedStudentsColumnsList: string[] = ['studentId', 'institute', "regulation", 'department', 'curriculum', 'semester', 'pattern', 'CGPA', 'actions'];
  displayedStudentsFragmentList: string[] = ['Subject_ID', 'Subject_Name', 'Type', 'Subject_Grade', 'Subject_Percent', 'Subject_Pointer', 'Action'];
  selectedPatternId: any;
  studentAcademicYear: any;
  studentMarksData: any;
  constructor(private api: ApiService, private _defaultsService: ApiServiceSkeletonDefault, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataStudentsList.filterPredicate = this.getFilterPredicate();
    var that = this;
    this.api.getAllInstituteList()
      .subscribe(data => {
        for (const d of (data.insArray as any)) {
          this.institutes.push({
            instituteID: d.instituteID,
            instituteName: d.instituteName
          });
        }
      });
    this._defaultsService.getSubjectSkeletonDefaults()
      .subscribe(
        data => {
          that.defaultSubjects = [];
          if (data.msg.toLowerCase() == "success") {
            this.defaultSubjects = data.data;
          }
        }
      );
  }
  getSemester() {
    var payloadForSemester: semesterPayload = {
      ins_id: this.studentInstitute,
      reg_id: this.studentRegulation,
      dep_id: this.studentDepartment,
      cur_no: this.studentCurriculum
    }
    console.log(payloadForSemester);
    this.api.getSemesterList(payloadForSemester)
      .subscribe(data => {
        console.log(data);
        for (const d of (data.semesters as any)) {
          this.semesters.push({
            semester: d.toString()
          });
        }
      });
    console.log(this.semesters);
  }
  getCurriculum() {
    this.curriculums = [];
    var payloadForCurriculum: curriculumPayload = {
      ins_id: this.studentInstitute,
      reg_id: this.studentRegulation,
      dep_id: this.studentDepartment,
    }
    console.log(payloadForCurriculum);
    this.api.getCurriculumList(payloadForCurriculum)
      .subscribe(data => {
        console.log(data);
        for (const d of (data.curArray as any)) {
          this.curriculums.push({
            curriculumID: d.Curriculum
          });
        }
      });
  }
  getDepartment() {
    this.departments = [];
    var payloadForDepartment: departmentPayload = {
      ins_id: this.studentInstitute,
      reg_id: this.studentRegulation
    }

    this.api.getDepartmentsList(payloadForDepartment)
      .subscribe(data => {
        console.log(data);
        for (const d of (data.depArray as any)) {
          this.departments.push({
            departmentID: d.departmentID,
            departmentName: d.departmentName,
          });
        }
      });
  }
  getMarks() {
    this.departments = [];
    var payloadForMarks: any = {
      ins_id: this.studentInstitute,
      reg_id: this.studentRegulation,
      dep_id: this.studentDepartment,
      cur_id: this.studentCurriculum,
      sem_no: this.studentSemester,
      acad: this.studentAcademicYear,
      patternId: this.defaultSubjectSelection
    }

    this.api.getStudentsMarkByPattern(payloadForMarks)
      .subscribe(data => {
        console.log(data);
        this.studentMarksData = data;
      });
  }
  getCourse() {
    this.courses = [];
    var payloadForCourse: courseListPayload = {
      ins_id: this.studentInstitute
    }

    this.api.getCourseList(payloadForCourse)
      .subscribe(data => {
        for (const d of (data as any)) {
          console.log(data);
          this.courses.push({
            course: d,
          });
        }
        console.log(this.courses);
      });
  }
  getBranch() {
    this.streams = [];
    var payloadForBranch: branchListPayload = {
      ins_id: this.studentInstitute,
      cor_id: this.studentCourse
    }
    this.api.getBranchList(payloadForBranch)
      .subscribe(data => {
        for (const d of (data as any)) {
          this.streams.push({
            Stream: d,
          });
        }
        console.log(this.streams);
      });
  }
  getRegulation() {
    this.regulations = [];
    var payloadForRegulation: regulationsPayload = {
      ins_id: this.studentInstitute
    }
    console.log(payloadForRegulation);
    this.api.getRegulationsList(payloadForRegulation)
      .subscribe(data => {
        if (data.message !== "Institution not found") {
          for (const d of (data as any)) {
            this.regulations.push({
              regulation: d,
            });
          }
          console.log(this.regulations);
        }
      });
  }


  selectSemester(event: any) {
    debugger;
    this.selectedSemester = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedSemester.trim();
  }
  selectCurriculum(event: any) {
    debugger;
    this.getSemester();
    this.selectedCurriculum = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedCurriculum.trim();
  }
  selectDepartment(event: any) {
    debugger;
    this.getCurriculum();
    this.selectedDepartment = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedDepartment.trim();
  }
  selectRegulation(event: any) {
    debugger;
    this.getCourse();
    this.selectedRegulation = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedRegulation.trim();
    this.getDepartment();
  }
  selectInstitute(event: any) {
    debugger;
    this.getRegulation();
    this.selectedInstitute = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedInstitute.trim();
  }
  selectStream(event: any) {
    debugger;
    this.selectedStream = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedStream.trim();
  }
  selectCourse(event: any) {
    debugger;
    this.selectedCourse = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedCourse.trim();
    this.getDepartment();
  }
  selectBatch(event: any) {
    debugger;
    this.selectedBatch = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedBatch.trim();
  }
  selectSection(event: any) {
    debugger;
    this.selectedSection = event.source.triggerValue;
    this.dataStudentsList.filter = this.selectedSection.trim();
  }
  selectPattern(event: any) {
    debugger;
    this.selectedPatternId = event.source.triggerValue;
    //this.dataStudentsList.filter = this.selectedSection.trim();
  }


  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.dataStudentsList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }
  getFilterPredicate() {
    return (row: STUDENTS_DATA, filters: string) => {

      var semester = this.selectedSemester;
      var institute = this.selectedInstitute;
      var regulation = this.selectedRegulation;
      var department = this.selectedDepartment;
      // var department = this.selectedSection;
      var course = this.selectedCourse;
      var curriculum = this.selectedCurriculum;

      const matchFilter = [];
      const dropSelectedSemester = row.semester;
      const dropSelectedInstitute = row.institute;
      const dropSelectedRegulation = row.regulation;
      const dropSelectedDepartment = row.department;
      const dropSelectedCourse = row.course;
      const dropSelectedCurriculum = row.curriculum;

      const customFilterSemester = dropSelectedSemester.includes(semester);
      const customFilterInstitute = dropSelectedInstitute.includes(institute);
      const customFilterRegulation = dropSelectedRegulation.includes(regulation);
      const customFilterDepartment = dropSelectedDepartment.includes(department);
      const customFilterCourse = dropSelectedCourse.includes(course);
      const customFilterCurriculum = dropSelectedCurriculum.includes(curriculum);

      matchFilter.push(customFilterSemester);
      matchFilter.push(customFilterInstitute);
      matchFilter.push(customFilterRegulation);
      matchFilter.push(customFilterDepartment);
      matchFilter.push(customFilterCourse);
      matchFilter.push(customFilterCurriculum);

      return matchFilter.every(Boolean);
    }
  }
  reset() {
    debugger;
    this.studentCourse = '';
    this.studentInstitute = '';
    this.studentRegulation = '';
    this.studentDepartment = '';
    this.studentCurriculum = '';
    this.studentSemester = '';
    this.defaultSubjectSelection = '';

    this.selectedStream = '';
    this.selectedCourse = '';
    this.selectedBatch = '';
    this.selectedSection = '';
    this.selectedInstitute = '';
    this.selectedRegulation = '';
    this.selectedDepartment = '';
    this.selectedCurriculum = '';

    this.dataStudentsList.filter = '';
  }
  openDialog(data: any) {
    console.log(data);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = data;

    this.dialog.open(DialogBodyComponent, dialogConfig);
  }

}
