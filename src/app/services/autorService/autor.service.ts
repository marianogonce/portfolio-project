import { Injectable } from '@angular/core';
import { url } from '../url';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DataService } from '../data.service';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutorService extends DataService {
  constructor(http: HttpClient, authService: AuthService) {
    super(url + '/autor', http, authService);
  }
}
