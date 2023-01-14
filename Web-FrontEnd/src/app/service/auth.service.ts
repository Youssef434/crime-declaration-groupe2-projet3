import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signer } from 'crypto';
import { Observable } from 'rxjs';
import { SignupRequest } from '../model/signup-request';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = '';
  signUpUrl: string = '';

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8081/api/auth/signin';
    this.signUpUrl = 'http://localhost:8081/api/auth/signup';
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  signUp(user: SignupRequest): Observable<any> {
    return this.http.post<any>(this.signUpUrl, user);
  }
}
