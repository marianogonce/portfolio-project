import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';



@Component({
  selector: 'softskills-badge',
  templateUrl: './softskills-badge.component.html',
  styleUrls: ['./softskills-badge.component.css']
})
export class SoftskillsBadgeComponent implements OnInit {
  

  @Input() softskillDescripcion:string = "";
  @Input() softskillId:number = 0;
  @Output() newItemEvent = new EventEmitter(); 

  constructor(public service: AuthService) { }

  ngOnInit(): void {
    
  }

  deleteSoftSkill() {
      this.newItemEvent.emit(
        {
        id: this.softskillId, 
        descripcion: this.softskillDescripcion
        });
  }


}
