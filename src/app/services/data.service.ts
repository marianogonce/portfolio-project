import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(@Inject(String) private url: string, private http: HttpClient) {} 
    
    getAll() {
        return this.http.get(this.url, { responseType: 'json' }).pipe(
          catchError(error => {console.log(error); return throwError(() =>error);}));
       }

    create(resource:any) {
        return this.http.post(this.url, resource,{ responseType: 'json' }).pipe(
          catchError(error => {console.log(error); return throwError(() =>error);}));     
        }
    

    delete(id:any) {
      return this.http.delete(this.url + "/" + id, { responseType: 'json' }).pipe(
        catchError(error => {console.log(error); return throwError(() =>error);})); 
      }

    update(resource:any) {
    return this.http.put(this.url, resource, { responseType: 'json' }).pipe(
      catchError(error => {console.log(error); return throwError(() =>error);})); 
    }
     
  }

