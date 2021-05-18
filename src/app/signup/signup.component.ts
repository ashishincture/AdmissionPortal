import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}
  pass;
  user;
  ngOnInit(): void {}
  signup() {
    console.log(this.user);
    console.log(this.pass);
  }
}
