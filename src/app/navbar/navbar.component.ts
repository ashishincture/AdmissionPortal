import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  showMenu = false;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToForm() {
    this.router.navigate(['/login']);
  }
  goToTable() {}
  goToChart() {}
  goToRounds() {
    this.router.navigate(['/rounds']);
  }
  goToMasterData() {
    this.router.navigate(['/masterdata']);
  }
  goToClgList() {
    this.router.navigate(['/clgList']);
  }
  goToFAQ() {
    this.router.navigate(['/faq']);
  }
  goToSeatMatrix(){
    this.router.navigate(['/seatmatrix']);
  }
  goToDocuments() {
    this.router.navigate(['/documents']);
  }
  goToStatus() {
    this.router.navigate(['/status']);
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
 }
 goTosub(){
  this.router.navigate(['/subject']);
 }
 goToRegulation(){
  this.router.navigate(['/regulation']);
 }
 goToCurriculum(){
  this.router.navigate(['/Curriculum']);
 }
}
