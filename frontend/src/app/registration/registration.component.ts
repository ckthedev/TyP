import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const formData = {
      username: this.registrationForm.get('username')!.value,
      email: this.registrationForm.get('email')!.value,
      password: this.registrationForm.get('password')!.value,
      password2: this.registrationForm.get('password2')!.value
    };

    this.dataService.register(formData.username, formData.email, formData.password, formData.password2)
      .then((data: any) => {
        console.log(data);
        this.router.navigate(['login']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
