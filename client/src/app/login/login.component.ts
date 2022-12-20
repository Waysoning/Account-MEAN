import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(user: any) {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe((res) => {
      // TODO: Handle login response: redirect to home page, display error message, etc.
      console.log('Login successful!');
      console.log(res);
    });
  }
}
