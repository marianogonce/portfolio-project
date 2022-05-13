import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../tools/OpenSnackbarfunction';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  captcha: string;
  captchaVisi: boolean;
  siteKey: string = environment.recaptcha.siteKey;

  loadingRequest: string = 'hidden';
  invalidLoggedIn = 'hidden';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(event: Event) {
    event.preventDefault;
    this.loadingRequest = 'visible';
    if (this.form.valid && this.captcha) {
      this.service
        .login({
          username: this.username?.value,
          password: this.password?.value,
        })
        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            this.router.navigate(['/']);
            openSnackBar(
              this._snackBar,
              'Welcome ' + this.username?.value,
              'info-snackbar',
              'x'
            );
          },
          error: () => {
            this.loadingRequest = 'hidden';
            this.invalidLoggedIn = 'visible';
            grecaptcha.reset();
          },
        });
    } else {
      this.loadingRequest = 'hidden';
      if (!this.captcha) {
        this.captchaVisi = true;
      }
      this.form.markAllAsTouched();
    }
  }

  constructor(
    public router: Router,
    public service: AuthService,
    private _snackBar: MatSnackBar
  ) {
    (this.captcha = ''), (this.captchaVisi = false);
  }

  resolve(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.captchaVisi = false;
  }
}
