import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import {HttpClient} from '@angular/common/http';
import {url} from '../url';


export interface AntecedentesLaboralesType {
   empleador:string,
   logoEmpleador: string,
   nombreTitulo: string,
   descripcion: string,
   ciudad: string, 
   periodo : {inicio: Date, finalizacion: Date} 
}

@Injectable({
  providedIn: 'root'
})
export class AntecedentesLaboralesService extends DataService {


  constructor (http: HttpClient) { 
    super(url + "/antlaborales", http);
  }
}
