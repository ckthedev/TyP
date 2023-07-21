import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.pattern("[a-zA-Z0-9]+")]],
    password: ['', [Validators.minLength(2)]]
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.dataService.login(this.loginForm.value)
      .then(data => {
        console.log(data);
        if (data['token']) {
          localStorage.setItem('token', data['token']);
          this.router.navigate(['dashboard']);
          alert('Login successful');
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
