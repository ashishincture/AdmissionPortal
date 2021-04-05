import { CarouselComponent } from './carousel/carousel.component';
import { ListComponent } from './list/list.component';
import { AllotmentComponent } from './allotment/allotment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ClgListComponent } from './clg-list/clg-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundComponent } from './round/round.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allotment', component: AllotmentComponent },
  { path: 'masterdata', component: MasterDataComponent },
  { path: 'courseList', component: CourseListComponent },
  { path: 'clgList', component: ClgListComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'round', component: RoundComponent },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'form', component: FormComponent },
  //     { path: 'table', component: TableComponent },
  //     { path: 'chart', component: ChartComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
