import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';

enum HardSkillLevelString {
  "None",
  "principiante",
  "intermedio",
  "avanzado"
}

@Component({
  selector: 'hardskill-card',
  templateUrl: './hardskill-card.component.html',
  styleUrls: ['./hardskill-card.component.css']
})
export class HardskillCardComponent implements OnInit {
  
  @Input() skillId : number = 0;
  @Input() skillDescripcion: string = "";
  @Input() skillNivel: number = 0;
  @Input() skillTipo: string = "";

  @Output() newItemEvent = new EventEmitter();
  
  defineUrl(nivel:string): string {

    let resultado:string;

    switch (nivel) {
      case "avanzado":
        resultado = "../../assets/img/svg hard skills/advance.svg";
          break;
      case "intermedio":
        resultado = "../../assets/img/svg hard skills/intermediate.svg";
          break;
      case "principiante":
        resultado = "../../assets/img/svg hard skills/beginner.svg";
          break;
      default:
        resultado = "../../assets/img/svg hard skills/void.svg";
        break;

  }

  return resultado;
  }

  urlDefined : any; 

  constructor(public authService : AuthService) { }

  deleteHardSkill() {
    this.newItemEvent.emit(
      {
        hardSkillId: this.skillId,
        hardSkillDescription: this.skillDescripcion
      }
    )
  }

  ngOnInit(): void {
    this.urlDefined = this.defineUrl(HardSkillLevelString[this.skillNivel]);
    
  }

}
