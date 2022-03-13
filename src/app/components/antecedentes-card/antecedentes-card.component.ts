import { Component, OnInit, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {faAngleUp} from '@fortawesome/free-solid-svg-icons';

enum EstadoAntecedentes {
  'NONE',
  'EN CURSO',
  'INCOMPLETO',
  'COMPLETO'
}


@Component({
  selector: 'antecedentes-card',
  templateUrl: './antecedentes-card.component.html',
  styleUrls: ['./antecedentes-card.component.css']
})
export class AntecedentesCardComponent implements OnInit {
  
  IsHide: boolean = true; 
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  ShowOrHideDescription() {
    this.IsHide = !this.IsHide;
  }


  @Input() imagenUrl : string = "";
  @Input() institucion : string = "";
  @Input() titulo : string = "";
  @Input() genero : string = "";
  @Input() periodoInicio : string = "";
  @Input() periodoFinal : string = "";
  @Input() estado : number = 0;
  @Input() descripcion : string = "";
  @Input() ciudad : string = "";
  @Input() IsAcademic : boolean = true;

   estadoString : string= "";

  defineBadgeColor() {
    let color: string; 

     switch (this.estadoString) {
      case "EN CURSO":
        color = "rgb(41, 132, 192)";
          break;
      case "INCOMPLETO":
        color = "rgb(195, 122, 27)";
          break;
      case "COMPLETO":
        color = "rgb(11, 155, 54)";
          break;
      default:
        color = "rgb(107, 106, 105)";
        break;
  }

  return color;
  }
    
  constructor() {
    
   }

  ngOnInit(): void {
    this.estadoString = EstadoAntecedentes[this.estado];
  
  }

}
