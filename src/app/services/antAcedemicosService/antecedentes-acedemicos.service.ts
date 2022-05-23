import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../url';
import { DataService } from '../data.service';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AntecedentesAcedemicosService extends DataService {
  constructor(http: HttpClient, authService: AuthService) {
    super(url + 'antacademicos', http, authService);
  }
}
