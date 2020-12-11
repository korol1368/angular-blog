import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(
      null,
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    )
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  submitFormLogin(): void {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
  }
}
