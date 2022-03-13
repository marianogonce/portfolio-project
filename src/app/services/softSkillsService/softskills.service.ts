import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import {HttpClient} from '@angular/common/http';
import {url} from '../url';

@Injectable({
  providedIn: 'root'
})
export class SoftskillsService extends DataService {



  constructor (http: HttpClient) { 
    super(url + "/softskills", http);
  }
}
