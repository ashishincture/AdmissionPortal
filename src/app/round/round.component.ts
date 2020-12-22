import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DetailsService } from '../details.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css'],
})
export class RoundComponent implements OnInit {
  constructor(private _router: Router, service: DetailsService) {
    this.courses = service.getCourses();
  }
  courses;

  showRounds;
  ngOnInit(): void {
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
  selectStudentList(id) {
    console.log(id);
    this._router.navigateByUrl('/list/' + id);
  }
}
