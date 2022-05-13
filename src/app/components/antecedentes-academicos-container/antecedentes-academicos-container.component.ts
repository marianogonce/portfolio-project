import { Component, OnInit } from '@angular/core';
import { AntecedentesAcedemicosService } from 'src/app/services/antAcedemicosService/antecedentes-acedemicos.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { openSnackBar } from '../tools/OpenSnackbarfunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap, ObservableInput } from 'rxjs';

@Component({
  selector: 'antecedentes-academicos-container',
  templateUrl: './antecedentes-academicos-container.component.html',
  styleUrls: ['./antecedentes-academicos-container.component.css'],
})
export class AntecedentesAcademicosContainerComponent implements OnInit {
  public pageAntecedentes: number = 1;
  faBookOpen = faBookOpen;
  listadoAntecedentes: any[any] = [];
  listadoAntecedentesAux: any[any] = [];

  constructor(
    private antacademicosService: AntecedentesAcedemicosService,
    private _snackBar: MatSnackBar,
    private fileService: FileServiceService
  ) {}

  deleteAntecedente(event: any) {
    this.listadoAntecedentes = this.listadoAntecedentes.filter(
      (item: any) => item.anacademicos_Id !== event.antId
    );
    this.antacademicosService
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
            " AntAcademico '" + event.titulo + " 'dropped",
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
    this.antacademicosService.getAll().subscribe((response) => {
      this.listadoAntecedentes = response;
      this.listadoAntecedentesAux = response;
    });
  }
}
