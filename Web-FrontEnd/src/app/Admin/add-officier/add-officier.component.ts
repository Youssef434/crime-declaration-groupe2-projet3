import { Component, OnInit } from '@angular/core';
import { SignupRequest } from 'src/app/model/signup-request';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-officier',
  templateUrl: './add-officier.component.html',
  styleUrls: ['./add-officier.component.css'],
})
export class AddOfficierComponent implements OnInit {
  signuprequest: SignupRequest = new SignupRequest();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  signup() {
    console.log(this.signuprequest);
    if (
      this.signuprequest.username == '' ||
      this.signuprequest.password == '' ||
      this.signuprequest.firstName == '' ||
      this.signuprequest.lastName == '' ||
      this.signuprequest.confirmpassword == ''
    ) {
      alert('Please fill all the fields');
    } else if (
      this.signuprequest.password === this.signuprequest.confirmpassword
    ) {
      this.authService.signUp(this.signuprequest).subscribe(
        (res) => {
          if (res == null) {
            alert('Registration failed');
            this.ngOnInit();
          } else {
            console.log('Registration successful');
            alert('Registration successful');
            this.cleanFields();
          }
        },
        (err) => {
          alert('Registration failed.');
          this.ngOnInit();
        }
      );
    } else {
      alert('password and confirm password don t match');
    }
  }
  cleanFields() {
    this.signuprequest.username = '';
    this.signuprequest.password = '';
    this.signuprequest.firstName = '';
    this.signuprequest.lastName = '';
    this.signuprequest.email = '';
    this.signuprequest.confirmpassword = '';
  }
}
