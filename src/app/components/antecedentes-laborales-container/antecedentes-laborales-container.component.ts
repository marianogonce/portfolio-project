import { Component, OnInit } from '@angular/core';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { AntecedentesLaboralesService } from 'src/app/services/antLaboralesService/antecedentes-laborales.service';

@Component({
  selector: 'antecedentes-laborales-container',
  templateUrl: './antecedentes-laborales-container.component.html',
  styleUrls: ['./antecedentes-laborales-container.component.css']
})
export class AntecedentesLaboralesContainerComponent implements OnInit {

  public pageAntecedentesLaborales:number = 1;
  faSuitcase = faSuitcase;
  listadoAntecedentes : any;


  constructor(private antlaboralesservice: AntecedentesLaboralesService) {

  }

  ngOnInit(): void {
    this.antlaboralesservice.getAll()
    .subscribe(
      response => {
      this.listadoAntecedentes = response;
    });
  }

}
