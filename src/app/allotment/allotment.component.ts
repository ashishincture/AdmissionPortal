import { Component, OnInit } from '@angular/core';
export interface AllotmentData {
  student_name: string;
  student_id: number;
  email: string;
  status: string;
}
const ALLOTMENT_DATA: AllotmentData[] = [
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
  {
    student_id: 1,
    student_name: 'Abhishek',
    email: 'abhk@gmail.com',
    status: 'Alloted',
  },
];
@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css'],
})
export class AllotmentComponent implements OnInit {
  displayedColumns: string[] = [
    'student_id',
    'student_name',
    'email',
    'status',
  ];
  dataSource = ALLOTMENT_DATA;
  constructor() {}

  ngOnInit(): void {}
}
