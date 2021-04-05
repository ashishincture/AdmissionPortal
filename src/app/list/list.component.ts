import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
          } else if (this.id === 2 && this.subject[i].data[j].rank <= 2000) {
            flag[this.id]++;
            this.subject[i].data[j].status = true;
          } else if (this.id === 3 && this.subject[i].data[j].rank <= 3000) {
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
  }
  onGoBack() {
    this.router.navigate(['/clgList']);
  }
}
