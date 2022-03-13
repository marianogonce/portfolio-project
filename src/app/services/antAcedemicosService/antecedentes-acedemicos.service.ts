import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../url';
import { DataService } from '../data.service';


export interface AntecedentesAcademicosType {
   
  institucion:string,
   logo: string,
   nombreTitulo: string,
   descripcion: string,
   genero: string,
   estado: string,
   periodo : {inicio: Date, finalizacion: Date}; 
}


@Injectable({
  providedIn: 'root'
})
export class AntecedentesAcedemicosService extends DataService{
  
  constructor (http: HttpClient) { 
    super(url + "/antacademicos", http);
  }

}
