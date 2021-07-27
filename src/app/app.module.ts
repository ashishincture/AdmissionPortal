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
    MatSortModule
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
