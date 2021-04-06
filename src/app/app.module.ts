import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { FaqComponent } from './faq/faq.component';

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
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
