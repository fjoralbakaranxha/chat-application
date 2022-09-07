import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  d: any;
  data: any;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.d = new Date().getTime().toString();
    this.data = { id: this.d, username: this.form.value.username };
    localStorage.setItem('user', JSON.stringify(this.data));
    console.log(this.data);

    {
    }
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['/chats'], {});
    }
  }
}
