import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import {HttpClient} from '@angular/common/http';
import {url} from '../url';

export interface HardSkillType {
  skillId: number,
  descripcionSkill: string,
  tipo : string,
  nivel: string,
}


@Injectable({
  providedIn: 'root'
})
export class HardskillsService extends DataService {
  
  constructor (http: HttpClient) { 
    super(url + "/hardskills", http);
  }
}
