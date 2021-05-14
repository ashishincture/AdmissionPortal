import { Component, OnInit, NgZone } from '@angular/core';
import{ MatDialog } from '@angular/material/dialog';
import { DialogApproveComponent } from '../dialog-approve/dialog-approve.component';
import { DialogNotApproveComponent } from '../dialog-not-approve/dialog-not-approve.component';
import {FormControl} from '@angular/forms';


// import { Console } from 'console';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  courses = new FormControl();
  courseList: string[] = ['Engineering', 'Medical', 'Management'];

  panelOpenState = false;
  public show: boolean = false;
  public buttonName: any = 'Show';

  arrRightBtn12 = [];
  arrRightBtn10 = [];
  arrHoldBtn12 = [];
  arrHoldBtn10 = [];

  studentDetails = [
    {
      'name': 'Bijay Mahapatra',
      'id': 'INC01347',
      'Xpercent': '93%',
      'XIIpercent': '93%',
      'category': 'General',
      'profilePic': 'assets/img/bijay.png'

    },
    {
      'name': 'Deeksha Jangid',
      'id': 'INC01349',
      'Xpercent': '96%',
      'XIIpercent': '95%',
      'category': 'General',
      'profilePic': 'assets/img/deeksha.png'

    },
    {
      'name': 'Ashish Kumar',
      'id': 'INC01344',
      'Xpercent': '93%',
      'XIIpercent': '93%',
      'category': 'General',
      'profilePic': 'assets/img/ashish.png'


    }, {
      'name': 'Chinmayi P',
      'id': 'INC01357',
      'Xpercent': '93%',
      'XIIpercent': '93%',
      'category': 'General',
      'profilePic': 'assets/img/chinmayi.png'


    }, {
      'name': 'Niharika Thakur',
      'id': 'INC01353',
      'Xpercent': '93%',
      'XIIpercent': '93%',
      'category': 'General',
      'profilePic': 'assets/img/niharika.png'


    }, {
      'name': 'Rishabh Kashyap',
      'id': 'INC01356',
      'Xpercent': '93%',
      'XIIpercent': '93%',
      'category': 'General',
      'profilePic': 'assets/img/rishabh.png'


    }

  ];

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void { }


  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  onPressRightX(oEvent) {

    for (var b = 0; b < this.arrHoldBtn10.length; b++) {
      var btn = document.getElementsByClassName("BtnHold1")[this.arrHoldBtn10[b]];
      btn.classList.remove("afterHoldBtn");

    }

    for (var a = 0; a < this.arrHoldBtn10.length; a++) {

      if (this.arrHoldBtn10[a] === oEvent) {
        this.arrHoldBtn10.splice(a, 1);
      }

    }

    for (var c = 0; c < this.arrHoldBtn10.length; c++) {
      var btn = document.getElementsByClassName("BtnHold1")[this.arrHoldBtn10[c]];
      btn.classList.add("afterHoldBtn");

    }




    for (var m = 0; m < this.arrRightBtn10.length; m++) {
      var btn = document.getElementsByClassName("BtnRight1")[this.arrRightBtn10[m]];
      btn.classList.remove("afterRightBtn");

    }


    var flag;

    var len = this.arrRightBtn10.length;
    if (len === 0) {
      this.arrRightBtn10.push(oEvent);
    } else {
      for (var i = 0; i < this.arrRightBtn10.length; i++) {
        if (oEvent === this.arrRightBtn10[i]) {
          var k = i;
          flag = 0;
          break;

        } else {
          flag = 1;

        }
      }

      if (flag === 0) {
        this.arrRightBtn10.splice(k, 1);
      } else {
        this.arrRightBtn10.push(oEvent);
      }

    }

    console.log(this.arrRightBtn10);

    for (var j = 0; j < this.arrRightBtn10.length; j++) {
      var btn = document.getElementsByClassName("BtnRight1")[this.arrRightBtn10[j]];
      btn.classList.add("afterRightBtn");

    }

    console.log(oEvent);

  }

  onPressRightXII(oEvent) {


    // var btn = document.getElementsByClassName("BtnRight2")[oEvent];
    // for (var i = 0; i < this.arrRightBtn12.length; i++) {
    //     if (oEvent = this.arrRightBtn12[i])
    //       btn.classList.remove("afterRightBtn");

    // }
    // this.arrRightBtn12.push(oEvent);
    // console.log(this.arrRightBtn12);

    // btn.classList.add("afterRightBtn");



    for (var b = 0; b < this.arrHoldBtn12.length; b++) {
      var btn = document.getElementsByClassName("BtnHold2")[this.arrHoldBtn12[b]];
      btn.classList.remove("afterHoldBtn");

    }

    for (var a = 0; a < this.arrHoldBtn12.length; a++) {

      if (this.arrHoldBtn12[a] === oEvent) {
        this.arrHoldBtn12.splice(a, 1);
      }

    }

    for (var c = 0; c < this.arrHoldBtn12.length; c++) {
      var btn = document.getElementsByClassName("BtnHold2")[this.arrHoldBtn12[c]];
      btn.classList.add("afterHoldBtn");

    }








    for (var m = 0; m < this.arrRightBtn12.length; m++) {
      var btn = document.getElementsByClassName("BtnRight2")[this.arrRightBtn12[m]];
      btn.classList.remove("afterRightBtn");

    }


    var flag;

    var len = this.arrRightBtn12.length;
    if (len === 0) {
      this.arrRightBtn12.push(oEvent);
    } else {
      for (var i = 0; i < this.arrRightBtn12.length; i++) {
        if (oEvent === this.arrRightBtn12[i]) {
          var k = i;
          flag = 0;
          break;

        } else {
          flag = 1;

        }
      }

      if (flag === 0) {
        this.arrRightBtn12.splice(k, 1);
      } else {
        this.arrRightBtn12.push(oEvent);
      }

    }

    console.log(this.arrRightBtn12);

    for (var j = 0; j < this.arrRightBtn12.length; j++) {
      var btn = document.getElementsByClassName("BtnRight2")[this.arrRightBtn12[j]];
      btn.classList.add("afterRightBtn");

    }

    console.log(oEvent);

  }




  onPressHoldX(oEvent) {

    for (var b = 0; b < this.arrRightBtn10.length; b++) {
      var btn = document.getElementsByClassName("BtnRight1")[this.arrRightBtn10[b]];
      btn.classList.remove("afterRightBtn");

    }

    for (var a = 0; a < this.arrRightBtn10.length; a++) {

      if (this.arrRightBtn10[a] === oEvent) {
        this.arrRightBtn10.splice(a, 1);
      }

    }

    for (var c = 0; c < this.arrRightBtn10.length; c++) {
      var btn = document.getElementsByClassName("BtnRight1")[this.arrRightBtn10[c]];
      btn.classList.add("afterRightBtn");

    }










    for (var m = 0; m < this.arrHoldBtn10.length; m++) {
      var btn = document.getElementsByClassName("BtnHold1")[this.arrHoldBtn10[m]];
      btn.classList.remove("afterHoldBtn");

    }


    var flag;

    var len = this.arrHoldBtn10.length;
    if (len === 0) {
      this.arrHoldBtn10.push(oEvent);
    } else {
      for (var i = 0; i < this.arrHoldBtn10.length; i++) {
        if (oEvent === this.arrHoldBtn10[i]) {
          var k = i;
          flag = 0;
          break;

        } else {
          flag = 1;

        }
      }

      if (flag === 0) {
        this.arrHoldBtn10.splice(k, 1);
      } else {
        this.arrHoldBtn10.push(oEvent);
      }

    }

    console.log(this.arrHoldBtn10);

    for (var j = 0; j < this.arrHoldBtn10.length; j++) {
      var btn = document.getElementsByClassName("BtnHold1")[this.arrHoldBtn10[j]];
      btn.classList.add("afterHoldBtn");

    }

    console.log(oEvent);

  }


  onPressHoldXII(oEvent) {


    for (var b = 0; b < this.arrRightBtn12.length; b++) {
      var btn = document.getElementsByClassName("BtnRight2")[this.arrRightBtn12[b]];
      btn.classList.remove("afterRightBtn");

    }

    for (var a = 0; a < this.arrRightBtn12.length; a++) {

      if (this.arrRightBtn12[a] === oEvent) {
        this.arrRightBtn12.splice(a, 1);
      }

    }

    for (var c = 0; c < this.arrRightBtn12.length; c++) {
      var btn = document.getElementsByClassName("BtnRight2")[this.arrRightBtn12[c]];
      btn.classList.add("afterRightBtn");

    }






    for (var m = 0; m < this.arrHoldBtn12.length; m++) {
      var btn = document.getElementsByClassName("BtnHold2")[this.arrHoldBtn12[m]];
      btn.classList.remove("afterHoldBtn");

    }


    var flag;

    var len = this.arrHoldBtn12.length;
    if (len === 0) {
      this.arrHoldBtn12.push(oEvent);
    } else {
      for (var i = 0; i < this.arrHoldBtn12.length; i++) {
        if (oEvent === this.arrHoldBtn12[i]) {
          var k = i;
          flag = 0;
          break;

        } else {
          flag = 1;

        }
      }

      if (flag === 0) {
        this.arrHoldBtn12.splice(k, 1);
      } else {
        this.arrHoldBtn12.push(oEvent);
      }

    }

    console.log(this.arrHoldBtn12);

    for (var j = 0; j < this.arrHoldBtn12.length; j++) {
      var btn = document.getElementsByClassName("BtnHold2")[this.arrHoldBtn12[j]];
      btn.classList.add("afterHoldBtn");

    }

    console.log(oEvent);

  }


  onPressApprove(oEvent){

    var flag;
    var flag1;

    for (var i = 0; i < this.arrRightBtn10.length; i++) {
     if(this.arrRightBtn10[i]===oEvent){
       flag=1;
     }else{
       flag=0;
     }

    }

    for (var j = 0; j < this.arrRightBtn12.length; j++) {
      if(this.arrRightBtn12[j]===oEvent){
        flag1=1;
      }else{
        flag1=0;
      }

    }


    if(flag===1 && flag1===1){
      this.dialog.open(DialogApproveComponent);
    }else{
      this.dialog.open(DialogNotApproveComponent);
    }
  
  }


}
