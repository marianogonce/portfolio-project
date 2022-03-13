import { Component, OnInit } from '@angular/core';
import { AntecedentesAcedemicosService, AntecedentesAcademicosType } from 'src/app/services/antAcedemicosService/antecedentes-acedemicos.service';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'antecedentes-academicos-container',
  templateUrl: './antecedentes-academicos-container.component.html',
  styleUrls: ['./antecedentes-academicos-container.component.css']
})
export class AntecedentesAcademicosContainerComponent implements OnInit {

  public pageAntecedentes:number = 1;
  faBookOpen = faBookOpen;
  listadoAntecedentes : any;


  constructor(private antacademicosService:AntecedentesAcedemicosService) {

  }


  ngOnInit(): void {
    this.antacademicosService.getAll()
    .subscribe(
      response => {
      this.listadoAntecedentes = response;
      console.log(this.listadoAntecedentes);
    });

  }

}
