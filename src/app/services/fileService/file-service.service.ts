import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../url';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FileServiceService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers = new HttpHeaders().append(
    'Authorization',
    this.authService.getToken()
  );

  uploadFile(resource: FormData) {
    return this.http
      .post(url + '/uploadFile', resource, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  downloadFile(fileName: string) {
    return this.http
      .get(url + '/downloadFile/' + fileName, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  deleteFile(fileName: string) {
    return this.http
      .delete(url + '/deleteFile/' + fileName, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}
