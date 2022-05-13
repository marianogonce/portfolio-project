import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { url } from '../url';
import { AuthService } from '../authService/auth.service';

export interface proyectType {
  projectId: string;
  tituloProyecto: string;
  descripcion: string;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends DataService {
  constructor(http: HttpClient, authService: AuthService) {
    super(url + '/projects', http, authService);
  }
}
