import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AllotmentComponent } from './allotment/allotment.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { ClgListComponent } from './clg-list/clg-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RoundComponent } from './round/round.component';
import { ListComponent } from './list/list.component';
import { SignupComponent } from './signup/signup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Globals } from './globals';
import { FaqComponent } from './faq/faq.component';
import { SeatmatrixComponent } from './seatmatrix/seatmatrix.component';
import { DialogNewComponent } from './dialog-new/dialog-new.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { DocumentsComponent } from './documents/documents.component';
import { StatusComponent } from './status/status.component';
import { DialogApproveComponent } from './dialog-approve/dialog-approve.component';
import { DialogNotApproveComponent } from './dialog-not-approve/dialog-not-approve.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentsServiceService } from './documents-service.service';

import { SubjectComponent } from './subject/subject.component';
import { SubjectService } from './subject.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RegulationComponent } from './regulation/regulation.component';
import { RegulationDetailsComponent } from './regulation-details/regulation-details.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { CurriculumComponent } from './Curriculum_folder/curriculum/curriculum.component';
import { CRcomp1Component } from './Curriculum_folder/crcomp1/crcomp1.component';
import { CreateCRComponent } from './Curriculum_folder/create-cr/create-cr.component';
import { SubjDialogComponent } from './Curriculum_folder/subj-dialog/subj-dialog.component';
import { NewRegulationComponent } from './new-regulation/new-regulation.component';
import { NewregTableComponent } from './newreg-table/newreg-table.component';
import { DepartmentComponent } from './department/department.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DialogGradingComponent } from './dialog-grading/dialog-grading.component';

import { LayoutModule } from '@angular/cdk/layout';
import { SkeletonTableConfigureComponent } from './skeleton-table-configure/skeleton-table-configure.component';
import { CourseComponent } from './course/course.component';
import { AddContributorDialogComponent } from './add-contributor-dialog/add-contributor-dialog.component';
import { MarksInsertionComponent } from './marks-insertion/marks-insertion.component';
import { SkeletonSubjectHeaderComponent } from './skeleton-subject-header/skeleton-subject-header.component';
import { MarksViewComponent } from './marks-view/marks-view.component';
import { SkeletonTableDefaultComponent } from './skeleton-table-default/skeleton-table-default.component';


//calendar
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CommonModule } from '@angular/common';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import 'flatpickr/dist/flatpickr.css';
// import { CalendarHeaderComponent } from './calendar-header.component';
// import { DemoUtilsModule } from '../demo-utils/module';

import { TimetableViewComponent } from './timetable-view/timetable-view.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogMarksUploadComponent } from './dialog-marks-upload/dialog-marks-upload.component';
import { AddDefaultSkeletonDialogComponent } from './add-default-skeleton-dialog/add-default-skeleton-dialog.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AllotmentComponent,
    MasterDataComponent,
    ClgListComponent,
    CourseListComponent,
    CarouselComponent,
    RoundComponent,
    ListComponent,
    SignupComponent,
    FaqComponent,
    SeatmatrixComponent,
    DialogNewComponent,
    DocumentsComponent,
    StatusComponent,
    DialogApproveComponent,
    DialogNotApproveComponent,
    SubjectComponent,
    UpdateDialogComponent,
    DepartmentComponent,
    RegulationComponent,
    RegulationDetailsComponent,
    DepartmentDetailsComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    CurriculumComponent,
    CRcomp1Component,
    CreateCRComponent,
    SubjDialogComponent,
    NewRegulationComponent,
    NewregTableComponent,
    DialogGradingComponent,
    SkeletonTableConfigureComponent,
    CourseComponent,
    AddContributorDialogComponent,
    MarksInsertionComponent,
    SkeletonSubjectHeaderComponent,
    MarksViewComponent,
    SkeletonTableDefaultComponent,
    CalendarViewComponent,
    TimetableViewComponent,
    DialogBodyComponent,
    DialogMarksUploadComponent,
    AddDefaultSkeletonDialogComponent,
    DialogExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    FusionChartsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    NgbModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot()
  ],
  providers: [
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Globals,
    FusionChartsModule,
    SubjectService,
    DocumentsServiceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
