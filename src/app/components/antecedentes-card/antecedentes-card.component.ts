import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { url } from 'src/app/services/url';
import { AuthService } from 'src/app/services/authService/auth.service';

enum EstadoAntecedentes {
  'NONE',
  'EN CURSO',
  'INCOMPLETO',
  'COMPLETO',
}

@Component({
  selector: 'antecedentes-card',
  templateUrl: './antecedentes-card.component.html',
  styleUrls: ['./antecedentes-card.component.css'],
})
export class AntecedentesCardComponent implements OnInit {
  IsHide: boolean = true;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  ShowOrHideDescription() {
    this.IsHide = !this.IsHide;
  }

  @Input() antId: number = 0;
  @Input() imagenExt: string = '';
  @Input() institucion: string = '';
  @Input() titulo: string = '';
  @Input() genero: string = '';
  @Input() periodoInicio: string = '';
  @Input() periodoFinal: string = '';
  @Input() estado: number = 0;
  @Input() descripcion: string = '';
  @Input() ciudad: string = '';
  @Input() IsAcademic: boolean = true;

  @Output() newItemEvent = new EventEmitter();

  estadoString: string = '';
  urlImagen = '';

  defineBadgeColor() {
    let color: string;

    switch (this.estadoString) {
      case 'EN CURSO':
        color = 'rgb(41, 132, 192)';
        break;
      case 'INCOMPLETO':
        color = 'rgb(195, 122, 27)';
        break;
      case 'COMPLETO':
        color = 'rgb(11, 155, 54)';
        break;
      default:
        color = 'rgb(107, 106, 105)';
        break;
    }

    return color;
  }

  constructor(public authService: AuthService) {}

  deleteAntecedente() {
    this.newItemEvent.emit({
      antId: this.antId,
      titulo: this.titulo,
      imagenExt: this.imagenExt,
    });
  }

  ngOnInit(): void {
    this.estadoString = EstadoAntecedentes[this.estado];
    this.urlImagen = url + '/downloadFile/' + this.antId + this.imagenExt;
  }
}
