import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { url } from '../url';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HardskillsService extends DataService {
  constructor(http: HttpClient, authService: AuthService) {
    super(url + '/hardskills', http, authService);
  }
}
