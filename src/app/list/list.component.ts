import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DetailsService } from '../details.service';
export interface studentDetails {
  id: number;
  name: string;
  rank: number;
  status: boolean;
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
  popup = false;
  goBack = false;
  id;
  subject;
  status;
  courses;
  subjectSelected;
  availableSeats;
  dataSource;
  displayedColumns: string[] = ['id', 'name', 'rank', 'status'];
  ELEMENT_DATA: studentDetails[];
  ngOnInit(): void {
    let params: any = this.activatedRoute.snapshot.params;
    this.id = +params.id;

    for (let course of this.courses) {
      if (this.id === course.id) {
        this.subjectSelected = course.name;
        this.availableSeats = course.seats;
        for (var i = 0; i < this.subject.length; i++) {
          if (this.id === this.subject[i].id) {
            // console.log(this.subject[i].data);
            this.ELEMENT_DATA = this.subject[i].data;
            break;
          }
        }
        break;
      }
    }
    this.dataSource = this.ELEMENT_DATA;
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
      text:
        'The seat will be alloted and saved for the student. Do you wish to continue?',
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
