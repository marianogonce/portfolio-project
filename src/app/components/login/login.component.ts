import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { openSnackBar } from '../tools/OpenSnackbarfunction';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  invalidLoggedIn = "hidden"; 

  form = new FormGroup({
    'username': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required)
  })


  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }


  onSubmit(event: Event) {
    event.preventDefault;

    if (this.form.valid) {
      this.service.login({user_name:this.username?.value, password: this.password?.value})
      .subscribe(response => {
        if(response) {
          this.router.navigate(["/"]);
          openSnackBar(this._snackBar, "Welcome " + this.username?.value , "green-snackbar", "x" );

          
        
        } else {
          this.invalidLoggedIn = "visible";
          setTimeout(() => {  this.invalidLoggedIn = "hidden"; },3000)
        }
      })

    } else {
      this.form.markAllAsTouched();
    }
  }

 
  constructor(public router: Router, public service: AuthService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {

  }

}
