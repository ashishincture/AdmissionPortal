import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clg-list',
  templateUrl: './clg-list.component.html',
  styleUrls: ['./clg-list.component.css'],
})
export class ClgListComponent implements OnInit {
  constructor(public router: Router) {}
  searchCollege;
  hideCarousel;
  showRounds;
  collegeList = [
    { id: 1, name: 'sit' },
    { id: 2, name: 'kiit' },
  ];
  ngOnInit(): void {
    this.hideCarousel = true;
    this.showRounds = false;
  }

  goToCourseList() {
    this.router.navigate(['/courseList']);
  }
  onSearchCollege() {
    if (this.searchCollege === 'undefined' || this.hideCarousel === '') {
      this.hideCarousel = true;
    } else {
      for (var i in this.collegeList) {
        console.log(this.collegeList[i].name);
        if (this.searchCollege !== this.collegeList[i].name) {
          // console.log('Not Found');
          this.hideCarousel = true;
          this.showRounds = false;
        } else {
          // console.log('Found');
          this.hideCarousel = false;
          this.showRounds = true;
          break;
        }
      }
    }
  }
}
