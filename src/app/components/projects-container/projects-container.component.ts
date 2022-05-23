import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { openSnackBar } from '../tools/OpenSnackbarfunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css'],
})
export class ProjectsContainerComponent implements OnInit {
  pageProject: number = 1;
  faAtom = faAtom;
  listadoDeProyectos: any[any] = [];
  listadoDeProyectosAux: any[any] = [];

  constructor(
    private projectService: ProjectsService,
    private _snackBar: MatSnackBar,
    private fileService: FileServiceService
  ) {}

  deleteProject(event: any) {
    this.listadoDeProyectos = this.listadoDeProyectos.filter(
      (item: any) => item.proyecto_id !== event.Id
    );
    this.projectService
      .delete(event.Id)
      .pipe(
        mergeMap((res) => {
          return this.fileService.deleteFile(event.deletehash);
        })
      )
      .subscribe({
        next: (response) => {
          this.listadoDeProyectosAux = this.listadoDeProyectos;
          openSnackBar(
            this._snackBar,
            " Project '" + event.titulo + " 'dropped",
            'info-snackbar',
            'x'
          );
        },
        error: (error: any) => {
          openSnackBar(
            this._snackBar,
            `No se pudo eliminar el proyecto ${event.titulo} por ${error?.message}`,
            'red-snackbar',
            'x'
          );
          this.listadoDeProyectos = this.listadoDeProyectosAux;
        },
      });
  }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((response) => {
      this.listadoDeProyectos = response;
      this.listadoDeProyectosAux = response;
    });
  }
}
