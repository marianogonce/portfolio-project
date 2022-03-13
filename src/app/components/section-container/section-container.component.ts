import { Component, OnInit, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';



@Component({
  selector: 'section-container',
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.css']
})
export class SectionContainerComponent implements OnInit {
  
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  @Input() icono : any = "";
  @Input() tituloYDescripcion : {titulo: string, descripcion: string} = {titulo: "", descripcion: ""};
  @Input() arrayDeElementos: any[] = [];
  @Input () formUrl: string = "";


  IsHide: boolean = false; 
    
  ShowOrHideList() {
    this.IsHide = !this.IsHide;
  }



  constructor(public service: AuthService) {

   }

  ngOnInit(): void {
  }

}
