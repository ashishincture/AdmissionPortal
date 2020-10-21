import { AllotmentComponent } from './allotment/allotment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allotment', component: AllotmentComponent },
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
