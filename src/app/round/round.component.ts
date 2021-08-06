import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DetailsService } from '../details.service';
import axios from 'axios';
import Swal from 'sweetalert2';
export interface studentDetails {
  student_id: string;
  name: string;
  Quota: string;
  Course_type: string;
  allocation_status: string;
}
@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css'],
})
export class RoundComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    service: DetailsService,
    public router: Router,
    private toastr: ToastrService
  ) {}
  id;
  courses;
  showCourses;
  freezeRound = [];
  showRounds;
  displayedColumns: string[] = [
    'student_id',
    'name',
    'Quota',
    'Course_type',
    'allocation_status',
  ];
  ELEMENT_DATA: studentDetails[];
  studentList;
  dataSource;
  ngOnInit(): void {
    this.showCourses = false;
    let params: any = this.activatedRoute.snapshot.params;
    console.log(params.id);
    this.showRounds = true;
    this.id = params.id;
    this.getStudentList();
    //
    axios
      .get(
        'https://university-app-2021.herokuapp.com/institute/view/' + params.id
      )
      .then((resp) => {
        console.log(resp.data.data);
        this.courses = resp.data.data[0].courseDetails;
        console.log(resp.data.data[0].courseDetails);
      })
      .catch((err) => {
        this.courses = err;
        console.log(err);
      });

    //
  }
  async getStudentList() {
    let sUrl;

    sUrl =
      'https://university-app-2021.herokuapp.com/student/filterCourse/' +
      this.id;

    let res = await axios({ url: sUrl, method: 'GET' })
      .then((resp) => {
        console.log(resp.data.data);
        if (resp.data.data.length > 0) {
          console.log(resp.data.data);
          this.studentList = resp.data.data;
        } else {
          console.log('List Not Found');
          this.studentList = [];
        }

        console.log(this.studentList);
        // this.studentList = resp.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.studentList);
    this.ELEMENT_DATA = this.studentList;
    this.dataSource = this.ELEMENT_DATA;
    // return res;
  }
  selectStudentList(Course_id) {
    console.log(Course_id);
    this.router.navigateByUrl('/list/' + Course_id + '/' + this.id);
  }
  onSeatAllot() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'The seat will be alloted to the student. Do you wish to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Allot',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showCourses = true;
        Swal.fire('Congrats', 'Seat alloted', 'success');
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });
  }
}
