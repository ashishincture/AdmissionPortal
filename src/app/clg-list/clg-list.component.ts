import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetailsService } from '../details.service';
import axios from 'axios';

@Component({
  selector: 'app-clg-list',
  templateUrl: './clg-list.component.html',
  styleUrls: ['./clg-list.component.css'],
})
export class ClgListComponent implements OnInit {
  constructor(
    public router: Router,
    private toastr: ToastrService,
    service: DetailsService
  ) {
    // this.collegeList = service.getCollegeList();
  }

  searchCollege;
  hideCarousel;
  showRounds;
  collegeList;
  collegeId;
  ngOnInit(): void {
    this.hideCarousel = true;
    this.showRounds = false;
    axios
      .get('https://university-app-2021.herokuapp.com/institute/view')
      .then((resp) => {
        this.collegeList = resp.data.data;
        console.log(resp.data.data);
      })
      .catch((err) => {
        this.collegeList = err;
        console.log(err);
      });
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
        if (this.searchCollege !== this.collegeList[i].Institution_name) {
          // console.log('Not Found');
          this.hideCarousel = true;
          this.showRounds = false;
          flag = 1;

          // break;
        } else {
          // console.log('Found');
          this.collegeId = this.collegeList[i].Institution_id;
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

    if (this.showRounds) {
      this.router.navigate(['/round/' + this.collegeId]);
      console.log(this.collegeId);
      // this.router.navigate(['/list/' + this.collegeId]);
      // this.router.navigateByUrl('/list/' + this.collegeId);
    }
    // } else if (this.hideCarousel) {
    //   this.router.navigate(['/clgList']);
    // }
  }
}
