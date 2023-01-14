import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CourseService } from './teacher/course.service';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './teacher/modal/modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { AdminService } from './service/admin.service';
import { TeacherService } from './service/techerService/teacher.service';
import { StudentService } from './service/studentService/student.service';
import { OfficiersListComponent } from './Admin/officiers-list/officiers-list.component';
import { AddOfficierComponent } from './Admin/add-officier/add-officier.component';
import { DeclarationsListComponent } from './Admin/declarations-list/declarations-list.component';
import { MapComponent } from './Admin/map/map.component';
import { DeclarationDetailsComponent } from './Admin/declaration-details/declaration-details.component';
import { OfficerDetailsComponent } from './Admin/officer-details/officer-details.component';
// modules
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ModalComponent,
    OfficiersListComponent,
    AddOfficierComponent,
    DeclarationsListComponent,
    MapComponent,
    DeclarationDetailsComponent,
    OfficerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    CarouselModule,
    ReactiveFormsModule,
    MatButtonModule,

    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  providers: [CourseService, AdminService, TeacherService, StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
