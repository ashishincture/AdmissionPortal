import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DetailsService } from '../details.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    service: DetailsService,
    private toastr: ToastrService
  ) {
    this.users = service.getUserDetails();
  }

  users;
  username: string;
  password: string;
  ngOnInit(): void {}

  login(): void {
    let flag = 0;
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.username === this.users[i].username &&
        this.password == this.users[i].password
      ) {
        flag = 1;
        break;
      } else {
        flag = 0;
      }
    }

    if (flag === 1) {
      this.toastr.success('Logged In', 'Success');
      this.router.navigate(['masterdata']);
    } else {
      this.toastr.error('Invalid Credentials', 'Error');
    }
  }
}
