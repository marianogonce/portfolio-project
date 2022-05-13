import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../url';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http
      .post(url + '/authenticate', credentials, { responseType: 'text' })
      .pipe(
        map((response) => {
          let result: any = response;
          if (result) {
            localStorage.setItem('token', JSON.parse(result).jwt);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) return false;

    let isExpired = jwtHelper.isTokenExpired(token!);

    return !isExpired;
  }

  getToken() {
    return 'Bearer ' + localStorage.getItem('token');
  }
}
