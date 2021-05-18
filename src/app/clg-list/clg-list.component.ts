import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-clg-list',
  templateUrl: './clg-list.component.html',
  styleUrls: ['./clg-list.component.css'],
})
export class ClgListComponent implements OnInit {
  constructor(public router: Router, private toastr: ToastrService) {}
  searchCollege;
  hideCarousel;
  showRounds;
  collegeList = [
    { id: 1, name: 'sit' },
    { id: 2, name: 'kiit' },
    { id: 3, name: 'nit' },
    { id: 4, name: 'iit' },
  ];
  ngOnInit(): void {
    this.hideCarousel = true;
    this.showRounds = false;
  }

  goToCourseList() {
    this.router.navigate(['/courseList']);
  }
  onChangeCollege(e) {
    this.searchCollege = e.target.value;
  }
  onSearchCollege() {
    let flag = 0;
    console.log(this.searchCollege);

    if (
      this.searchCollege === 'undefined' ||
      this.searchCollege === '' ||
      this.searchCollege === 'None'
    ) {
      this.hideCarousel = true;
    } else {
      for (var i in this.collegeList) {
        if (this.searchCollege !== this.collegeList[i].name) {
          // console.log('Not Found');
          this.hideCarousel = true;
          this.showRounds = false;
          flag = 1;

          // break;
        } else {
          // console.log('Found');
          this.hideCarousel = false;
          this.showRounds = true;
          flag = 0;
          break;
        }
      }
    }
    if (flag === 1) {
      this.toastr.error('College not found', 'Error');
    }
    console.log(this.hideCarousel);
    console.log(this.showRounds);
    // if (this.showRounds) {
    //   this.router.navigate(['/round']);
    // } else if (this.hideCarousel) {
    //   this.router.navigate(['/clgList']);
    // }
  }
}
