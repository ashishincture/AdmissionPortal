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
  showSkeletonMenu = false;

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
  goToSeatMatrix() {
    this.router.navigate(['/seatmatrix']);
  }
  goToDocuments() {
    this.router.navigate(['/documents']);
  }
  goToStatus() {
    this.router.navigate(['/status']);
  }
  goToDepartment() {
    this.router.navigate(['/department']);
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  goTosub() {
    this.router.navigate(['/subject']);
  }

  goToDept() {
    this.router.navigate(['/department']);
  }
  goToRegulation() {
    this.router.navigate(['/regulation']);
  }
  goToCurriculum() {
    this.router.navigate(['/Curriculum']);
  }
  goToMarksView() {
    this.router.navigate(['/marksView']);
  }
  goToMarksInsertion() {
    this.router.navigate(['/marksInsertion']);
  }
  goToSkeletonView() {
    this.router.navigate(['/skeletonView']);
  }
  goToSkeletonDefaults() {
    this.router.navigate(['/skeletonDefaults']);
  }
  toggleSkeletonMenu() {
    this.showSkeletonMenu = !this.showSkeletonMenu;
  }
}
