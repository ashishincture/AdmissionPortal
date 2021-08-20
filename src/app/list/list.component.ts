import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DetailsService } from '../details.service';
import axios from 'axios';
export interface studentDetails {
  student_id: string;
  name: string;
  Quota: string;
  Course_type: string;
  allocation_status: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    service: DetailsService,
    public router: Router
  ) {
    this.courses = service.getCourses();
    this.subject = service.getSubject();
  }
  courses;
  popup = false;
  goBack = false;
  id;
  subject;
  status;
  courseId;
  institueId;
  subjectSelected;
  availableSeats;
  showCourse;
  dataSource;
  studentList = [];
  selectCourse;
  displayedColumns: string[] = [
    'student_id',
    'name',
    'Quota',
    'Course_type',
    'allocation_status',
  ];
  ELEMENT_DATA: studentDetails[];
  ngOnInit(): void {
    let params: any = this.activatedRoute.snapshot.params;
    console.log(params);
    this.courseId = params.courseId;
    this.institueId = params.instId;
    console.log(this.courseId);
    console.log(this.institueId);
    this.getStudentList('test');
  }

  async getStudentList(courseName) {
    let sUrl;
    this.studentList = [];
    if (courseName === 'B.Tech' || courseName === 'M.Tech') {
      sUrl =
        'https://university-app-2021.herokuapp.com/student/filterCourse/' +
        this.institueId +
        '/' +
        courseName +
        '/' +
        this.courseId;
    } else {
      sUrl =
        'https://university-app-2021.herokuapp.com/student/filterCourse/' +
        this.institueId;
    }
    let res = await axios({ url: sUrl, method: 'GET' })
      .then((resp) => {
        console.log(resp.data.data);
        if (resp.data.data.length > 0) {
          for (let i = 0; i < resp.data.data.length; i++) {
            if (this.courseId === resp.data.data[i].Course_id) {
              this.studentList.push(resp.data.data[i]);
            }
          }
          for (let i = 0; i < this.studentList.length; i++) {
            for (let j = 0; j < this.studentList[j].priority.length; j++) {
              if (this.courseId === this.studentList[i].priority[j].Course_id) {
                this.showCourse = this.studentList[i].priority[j].Course_name;

                break;
              }
            }
          }
          console.log(this.showCourse);
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
  onChangeCollege(e) {
    this.selectCourse = e.target.value;
    if (this.selectCourse != 'None') {
      console.log(this.selectCourse);
      this.getStudentList(this.selectCourse);
    } else {
      console.log(this.selectCourse);
    }
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
        let flag = new Array(this.courses.length);
        for (let i = 1; i <= this.courses.length; i++) flag[i] = 0;
        for (var i = 0; i < this.subject.length; i++) {
          if (this.id === this.subject[i].id) {
            // console.log(this.subject[i].data[i]);
            for (var j = 0; j < this.subject[i].data.length; j++) {
              // console.log(this.subject[i].data[j]);
              if (this.id === 1 && this.subject[i].data[j].rank <= 1000) {
                flag[this.id]++;
                this.subject[i].data[j].status = true;
              } else if (
                this.id === 2 &&
                this.subject[i].data[j].rank <= 2000
              ) {
                flag[this.id]++;
                this.subject[i].data[j].status = true;
              } else if (
                this.id === 3 &&
                this.subject[i].data[j].rank <= 3000
              ) {
                flag[this.id]++;
                this.subject[i].data[j].status = true;
              }

              this.status = this.subject[i].data;
            }
            break;
          }
        }
        console.log(flag);
        this.availableSeats = this.availableSeats - flag[this.id];
        this.dataSource = this.status;
        Swal.fire('Congrats', 'Seat alloted', 'success');
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });

    // let flag = new Array(this.courses.length);
    // for (let i = 1; i <= this.courses.length; i++) flag[i] = 0;
    // for (var i = 0; i < this.subject.length; i++) {
    //   if (this.id === this.subject[i].id) {
    //     // console.log(this.subject[i].data[i]);
    //     for (var j = 0; j < this.subject[i].data.length; j++) {
    //       // console.log(this.subject[i].data[j]);
    //       if (this.id === 1 && this.subject[i].data[j].rank <= 1000) {
    //         flag[this.id]++;
    //         this.subject[i].data[j].status = true;
    //       } else if (this.id === 2 && this.subject[i].data[j].rank <= 2000) {
    //         flag[this.id]++;
    //         this.subject[i].data[j].status = true;
    //       } else if (this.id === 3 && this.subject[i].data[j].rank <= 3000) {
    //         flag[this.id]++;
    //         this.subject[i].data[j].status = true;
    //       }

    //       this.status = this.subject[i].data;
    //     }
    //     break;
    //   }
    // }
    // console.log(flag);
    // this.availableSeats = this.availableSeats - flag[this.id];
    // this.dataSource = this.status;
  }
  onGoBack() {
    this.router.navigate(['/clgList']);
  }
  onSaveAllotment() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'The seat will be alloted and saved for the student. Do you wish to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Clicked Yes, File deleted!');
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });
  }
  onRankSort() {
    const filterRanks = this.dataSource;
    console.log(this.dataSource);
    filterRanks.sort((a, b) =>
      a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
    );

    console.log(filterRanks);
    this.dataSource = filterRanks;
  }
}
