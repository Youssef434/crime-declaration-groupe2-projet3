import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly url = 'http://localhost:8081/admin/';
  auth_token = localStorage.getItem('token');
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth_token}`,
  });
  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any> {
    return this.http.get<any>(this.url + 'policiers', {
      headers: this.headers,
    });
  }

  getAllStudents(): Observable<any> {
    return this.http.get<any>(this.url + 'students', { headers: this.headers });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(this.url + 'deletestudent/' + id, {
      headers: this.headers,
    });
  }
  deleteTeacher(id: number): Observable<any> {
    return this.http.delete<any>(this.url + 'deleteteacher/' + id, {
      headers: this.headers,
    });
  }

  getAllDeclarations(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/get-all-declarations/', {
      headers: this.headers,
    });
  }
}
