import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../globals';
@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css'],
})
export class MasterDataComponent implements OnInit {
  uri: string = 'https://university-app-2021.herokuapp.com/university';
  univData = [];

  constructor(
    public router: Router,
    public global: Globals,
    public http: HttpClient,
    private toastr: ToastrService
  ) {}
  onPressSubmit() {
    var data2 = {
      University_id: this.global.data.InstitutionId,
      University_name: this.global.data.InstitutionName,
      University_type: this.global.data.InstitutionType,
      University_description: this.global.data.Description,
    };
    // var universities;
    // let univ2 =this.http.get(`${this.uri}`+'/view');
    // univ2.subscribe((data: any) => universities = data);
    let univ2 = this.http.get(`${this.uri}` + '/view');
    univ2.subscribe((data: any) => {
      this.univData = data.data;
    });
    let univ = this.http.post(`${this.uri}` + '/add', data2);
    univ.subscribe((data: any) => console.log(data));
    console.log(this.univData);
    this.toastr.success('Institution Registered', 'Success');
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {}
}
// export
