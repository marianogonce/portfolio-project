import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { AntecedentesAcedemicosService } from 'src/app/services/antAcedemicosService/antecedentes-acedemicos.service';
import { EstadoAcademicoService } from 'src/app/services/antAcademicosEstadoService/estado-academico.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-ant-academicos-form',
  templateUrl: './edit-ant-academicos-form.component.html',
  styleUrls: ['./edit-ant-academicos-form.component.css'],
})
export class EditAntAcademicosFormComponent implements OnInit {
  antAcademicosToUpdateId: any;
  antecedentesAcedemicosArray: any;
  antecedentesAcedemicoToUpdateData: any;

  form = new FormGroup({
    antacademicos_titulo: new FormControl('', Validators.required),
    antacademicos_genero: new FormControl('', Validators.required),
    antacademicos_institucion: new FormControl('', Validators.required),
    antacademicos_fecha_inicio: new FormControl('', Validators.required),
    antacademicos_fecha_fin: new FormControl('', Validators.required),
    antacademicos_descripcion: new FormControl('', Validators.required),
    antacademicos_estado: new FormControl('', Validators.required),
  });

  get antacademicos_titulo() {
    return this.form.get('antacademicos_titulo');
  }

  get antacademicos_genero() {
    return this.form.get('antacademicos_genero');
  }

  get antacademicos_institucion() {
    return this.form.get('antacademicos_institucion');
  }
  get antacademicos_fecha_inicio() {
    return this.form.get('antacademicos_fecha_inicio');
  }
  get antacademicos_fecha_fin() {
    return this.form.get('antacademicos_fecha_fin');
  }
  get antacademicos_descripcion() {
    return this.form.get('antacademicos_descripcion');
  }
  get antacademicos_estado() {
    return this.form.get('antacademicos_estado');
  }

  constructor(
    public antecedentesAcedemicosService: AntecedentesAcedemicosService,
    public EstadoAcademicoService: EstadoAcademicoService,
    public autorService: AutorService,
    public fileService: FileServiceService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  PageLoading: string = 'visible';
  loadingRequest: string = 'hidden';
  invalidAdd: string = 'hidden';
  estados: any;

  private datosAutor: any;
  private userName: string = '';
  public imageFile: any;
  private imageFileToUpload: any;
  public preview: any;
  public fileMessage: any;

  getImageFile(imageFile: any) {
    this.imageFile = imageFile;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let observableToSubscribe: Observable<unknown>[] = [];
      this.loadingRequest = 'visible';
      this.antecedentesAcedemicosService
        .update({
          anacademicos_Id:
            this.antecedentesAcedemicoToUpdateData.anacademicos_Id,
          antacademicos_Img_url:
            this.antecedentesAcedemicoToUpdateData.antacademicos_Img_url,
          antacademicos_institucion: this.antacademicos_institucion?.value,
          antacademicos_fechaInicio: this.antacademicos_fecha_inicio?.value,
          antacademicos_fechaFin: this.antacademicos_fecha_fin?.value,
          antacademicos_descripcion: this.antacademicos_descripcion?.value,
          antacademicos_estado: parseInt(this.antacademicos_estado?.value),
          autor: this.userName,
          antacademicos_genero: this.antacademicos_genero?.value,
          antacademicos_titulo: this.antacademicos_titulo?.value,
          antacademicos_Img_deletehash:
            this.antecedentesAcedemicoToUpdateData.antacademicos_Img_deletehash,
        })
        .pipe(
          mergeMap((res: any) => {
            if (this.imageFile) {
              const formData = new FormData();
              this.imageFileToUpload = new File(
                [this.imageFile],
                this.imageFile.name
              );
              formData.append('file', this.imageFileToUpload);
              formData.append('typeEntity', 'antacademico');
              formData.append('idEntity', res.toString());
              return this.fileService
                .deleteFile(
                  this.antecedentesAcedemicoToUpdateData
                    .antacademicos_Img_deletehash
                )
                .pipe(
                  mergeMap((re: any) => {
                    return this.fileService.uploadFile(formData);
                  })
                );
            }
            return of({});
          })
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'Ant Academicos updated : ' +
                "'" +
                this.antacademicos_titulo?.value +
                "'",
              'green-snackbar',
              'x'
            );
          },
          error: (error: any) => {
            this.loadingRequest = 'hidden';
            this.invalidAdd = 'visible';
            openSnackBar(
              this._snackBar,
              `${error?.message}`,
              'red-snackbar',
              'x'
            );
          },
        });
    } else {
      this.form.markAllAsTouched();
      if (!this.imageFile) {
        this.imageFile = false;
      }
    }
  }

  ngOnInit(): void {
    this.autorService.getAll().subscribe({
      next: (response) => {
        this.PageLoading = 'hidden';
        this.datosAutor = response;
        this.userName = this.datosAutor[0].username;
      },
    });

    this.EstadoAcademicoService.getAll().subscribe({
      next: (response) => {
        this.estados = response;
      },
    });

    this.route.paramMap.subscribe({
      next: (param) => {
        if (param.get('idAntAcademico')) {
          this.antAcademicosToUpdateId = param.get('idAntAcademico');
        }
      },
    });

    this.antecedentesAcedemicosService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.antecedentesAcedemicosArray = response;
        this.antecedentesAcedemicoToUpdateData =
          this.antecedentesAcedemicosArray[
            this.antecedentesAcedemicosArray
              .map((e: any) => e.anacademicos_Id)
              .indexOf(parseInt(this.antAcademicosToUpdateId))
          ];
        if (!this.antecedentesAcedemicoToUpdateData) {
          this.router.navigate(['/notfound']);
        }
        this.antacademicos_institucion?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_institucion
        );
        this.antacademicos_fecha_inicio?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_fechaInicio
        );
        this.antacademicos_fecha_fin?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_fechaFin
        );
        this.antacademicos_descripcion?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_descripcion
        );
        this.antacademicos_estado?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_estado
        );
        this.antacademicos_genero?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_genero
        );
        this.antacademicos_titulo?.setValue(
          this.antecedentesAcedemicoToUpdateData.antacademicos_titulo
        );
        this.preview =
          this.antecedentesAcedemicoToUpdateData.antacademicos_Img_url;
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
        openSnackBar(this._snackBar, `${error?.message}`, 'red-snackbar', 'x');
      },
    });
  }
}
