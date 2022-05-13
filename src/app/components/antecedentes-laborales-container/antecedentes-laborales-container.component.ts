import { Component, OnInit } from '@angular/core';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { AntecedentesLaboralesService } from 'src/app/services/antLaboralesService/antecedentes-laborales.service';
import { openSnackBar } from '../tools/OpenSnackbarfunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'antecedentes-laborales-container',
  templateUrl: './antecedentes-laborales-container.component.html',
  styleUrls: ['./antecedentes-laborales-container.component.css'],
})
export class AntecedentesLaboralesContainerComponent implements OnInit {
  public pageAntecedentesLaborales: number = 1;
  faSuitcase = faSuitcase;
  listadoAntecedentes: any[any] = [];
  listadoAntecedentesAux: any[any] = [];

  constructor(
    private antlaboralesservice: AntecedentesLaboralesService,
    private _snackBar: MatSnackBar,
    private fileService: FileServiceService
  ) {}

  deleteAntecedente(event: any) {
    this.listadoAntecedentes = this.listadoAntecedentes.filter(
      (item: any) => item.antlaborales_id !== event.antId
    );
    this.antlaboralesservice
      .delete(event.antId)
      .pipe(
        mergeMap((res) => {
          return this.fileService.deleteFile(
            event.antId.toString() + event.imagenExt
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.listadoAntecedentesAux = this.listadoAntecedentes;
          openSnackBar(
            this._snackBar,
            " AntLaboral '" + event.titulo + " 'dropped",
            'info-snackbar',
            'x'
          );
        },
        error: (error: any) => {
          openSnackBar(
            this._snackBar,
            `No se pudo eliminar la habilidad ${event.titulo} por ${error?.message}`,
            'red-snackbar',
            'x'
          );
          this.listadoAntecedentes = this.listadoAntecedentesAux;
        },
      });
  }

  ngOnInit(): void {
    this.antlaboralesservice.getAll().subscribe((response) => {
      this.listadoAntecedentes = response;
      this.listadoAntecedentesAux = response;
    });
  }
}
