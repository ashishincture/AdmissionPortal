import { SignupComponent } from './signup/signup.component';
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
import { FaqComponent } from './faq/faq.component';
import { SeatmatrixComponent } from './seatmatrix/seatmatrix.component';
import { DocumentsComponent } from './documents/documents.component';
import { StatusComponent } from './status/status.component';
import { SubjectComponent } from './subject/subject.component';
import { RegulationComponent } from './regulation/regulation.component';
import { RegulationDetailsComponent } from './regulation-details/regulation-details.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { CurriculumComponent } from './Curriculum_folder/curriculum/curriculum.component';
import { NewRegulationComponent } from './new-regulation/new-regulation.component';
import { DepartmentComponent } from './department/department.component';
// import { Crcomp1Component } from './Curriculum_folder/crcomp1/crcomp1.component';
// import { CreateCrComponent } from './Curriculum_folder/create-cr/create-cr.component';
// import { SubjDialogComponent } from './Curriculum_folder/subj-dialog/subj-dialog.component';
import { MarksViewComponent } from './marks-view/marks-view.component'
import { MarksInsertionComponent } from './marks-insertion/marks-insertion.component'
import { SkeletonTableConfigureComponent } from './skeleton-table-configure/skeleton-table-configure.component';
import { SkeletonTableDefaultComponent } from './skeleton-table-default/skeleton-table-default.component'
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { TimetableViewComponent} from './timetable-view/timetable-view.component';
import { CalendarModuleComponent} from './calendar-module/calendar-module.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'seatmatrix', component: SeatmatrixComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allotment', component: AllotmentComponent },
  { path: 'masterdata', component: MasterDataComponent },
  { path: 'courseList', component: CourseListComponent },
  { path: 'clgList', component: ClgListComponent },
  { path: 'list/:courseId/:instId', component: ListComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'round/:id', component: RoundComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'status', component: StatusComponent },

  { path: 'faq', component: FaqComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'regulation', component: RegulationComponent },
  { path: 'regulationdetail', component: RegulationDetailsComponent },
  { path: 'departmentdetail', component: DepartmentDetailsComponent },
  { path: 'addsubject', component: AddSubjectComponent },
  { path: 'editsubject', component: EditSubjectComponent },
  { path: 'add', component: NewRegulationComponent },
  { path: 'Curriculum', component: CurriculumComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'skeletonView', component: SkeletonTableConfigureComponent },
  { path: 'skeletonDefaults', component: SkeletonTableDefaultComponent },
  { path: 'marksView', component: MarksViewComponent },
  { path: 'marksInsertion', component: MarksInsertionComponent },
  { path: 'calendarView', component: CalendarViewComponent },
  { path: 'calendar', component: CalendarModuleComponent },
  { path: 'timetable', component:  TimetableViewComponent}

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
