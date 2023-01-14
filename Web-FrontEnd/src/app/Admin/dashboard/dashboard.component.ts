import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Declaration } from 'src/app/model/declaration/declaration';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Officiers: User[] = [];
  declarations: Declaration[] = [];
  admin: User = new User(
    parseInt(localStorage.getItem('userId')!),
    localStorage.getItem('full-name')!,
    localStorage.getItem('token')!
  );
  constructor(private adminService: AdminService, private router: Router) {} //private router: Router //private employeeService: EmployeeService,
  appState: number = 0;
  ngOnInit(): void {
    console.log(this.admin);
    this.adminService.getAllTeachers().subscribe(
      (res) => {
        this.Officiers = res;
        console.log(res);
      },
      (err) => {
        //this.router.navigate(['/login']);
      }
    );
    this.adminService.getAllDeclarations().subscribe(
      (res) => {
        this.declarations = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteStudent(id: number) {
    this.adminService.deleteStudent(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleSideBarClick(id: number) {
    this.appState = id;
  }
  deleteteacher(id: number) {
    this.adminService.deleteTeacher(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
