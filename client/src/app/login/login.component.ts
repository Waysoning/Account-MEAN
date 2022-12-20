import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(user: any) {
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log('Invalid credentials');
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
