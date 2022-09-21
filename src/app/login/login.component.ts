import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  d: any;
  data: any;
  form!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.form.value);
  }

  // onSubmit() {
  //   if (!this.form.valid) {
  //     return;
  //   }
  //   this.d = new Date().getTime().toString();
  //   this.data = {
  //     id: this.d,
  //     username: this.form.value.username,
  //     password: this.form.value.password,
  //   };
  //   localStorage.setItem('user', JSON.stringify(this.data));
  //   console.log(this.data);

  //   {
  //   }
  // }
  ngOnInit() {}
}
