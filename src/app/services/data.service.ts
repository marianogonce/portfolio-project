import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    @Inject(String) private url: string,
    private http: HttpClient,
    @Inject(AuthService) private authService: AuthService
  ) {}

  private headers = new HttpHeaders().append(
    'Authorization',
    this.authService.getToken()
  );

  getAll() {
    return this.http.get(this.url, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  create(resource: any) {
    return this.http
      .post(this.url, resource, { headers: this.headers, responseType: 'json' })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  delete(id: any) {
    return this.http
      .delete(this.url + '/' + id, {
        headers: this.headers,
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  update(resource: any) {
    return this.http
      .put(this.url, resource, { headers: this.headers, responseType: 'json' })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}
