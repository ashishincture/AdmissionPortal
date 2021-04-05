import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DetailsService } from '../details.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css'],
})
export class RoundComponent implements OnInit {
  constructor(
    private _router: Router,
    service: DetailsService,
    private toastr: ToastrService
  ) {
    this.courses = service.getCourses();
  }
  courses;
  freezeRound = [];
  showRounds;
  ngOnInit(): void {
    this.freezeRound[1] = false;
    this.freezeRound[2] = false;
    this.freezeRound[3] = false;

    this.showRounds = true;
  }
  goRound1() {
    this.showRounds = false;
  }
  goRound2() {
    this.showRounds = false;
  }
  goRound3() {
    this.showRounds = false;
  }
  goFreeze1() {
    this.freezeRound[1] = true;
    this.toastr.warning('Round 1 is Freezed', 'Freeze');
    if (this.freezeRound[3] && this.freezeRound[1] && this.freezeRound[2]) {
      // this.toastr.success('All rounds is Freezed', 'Success');
      window.location.reload();
    }
  }
  goFreeze2() {
    this.freezeRound[2] = true;
    this.toastr.warning('Round 2 is Freezed', 'Freeze');
    if (this.freezeRound[3] && this.freezeRound[1] && this.freezeRound[2]) {
      window.location.reload();
    }
  }
  goFreeze3() {
    this.freezeRound[3] = true;
    this.toastr.warning('Round 3 is Freezed', 'Freeze');
    if (this.freezeRound[3] && this.freezeRound[1] && this.freezeRound[2]) {
      window.location.reload();
    }
  }
  selectStudentList(id) {
    console.log(id);
    this._router.navigateByUrl('/list/' + id);
  }
}
