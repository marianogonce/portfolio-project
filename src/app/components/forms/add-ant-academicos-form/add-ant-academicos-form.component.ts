import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { AntecedentesAcedemicosService } from 'src/app/services/antAcedemicosService/antecedentes-acedemicos.service';
import { EstadoAcademicoService } from 'src/app/services/antAcademicosEstadoService/estado-academico.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-ant-academicos-form',
  templateUrl: './add-ant-academicos-form.component.html',
  styleUrls: ['./add-ant-academicos-form.component.css'],
})
export class AddAntAcademicosFormComponent implements OnInit {
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
    public AntecedentesAcedemicosService: AntecedentesAcedemicosService,
    public EstadoAcademicoService: EstadoAcademicoService,
    public autorService: AutorService,
    public fileService: FileServiceService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  PageLoading: string = 'visible';
  loadingRequest: string = 'hidden';
  invalidAdd: string = 'hidden';
  estados: any;
  public noImageUpload: any;

  private datosAutor: any;
  private userName: string = '';
  public imageFile: any;
  private imageFileToUpload: any;
  public preview: any;
  public fileMessage: any;

  getImageFile(imageFile: any) {
    this.imageFile = imageFile;
    this.noImageUpload = true;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid && this.imageFile) {
      this.loadingRequest = 'visible';
      this.AntecedentesAcedemicosService.create({
        antacademicos_Img_url: '',
        antacademicos_institucion: this.antacademicos_institucion?.value,
        antacademicos_fechaInicio: this.antacademicos_fecha_inicio?.value,
        antacademicos_fechaFin: this.antacademicos_fecha_fin?.value,
        antacademicos_descripcion: this.antacademicos_descripcion?.value,
        antacademicos_estado: parseInt(this.antacademicos_estado?.value),
        autor: this.userName,
        antacademicos_genero: this.antacademicos_genero?.value,
        antacademicos_titulo: this.antacademicos_titulo?.value,
        antacademicos_Img_deletehash: '',
      })
        .pipe(
          mergeMap((res: any) => {
            const formData = new FormData();
            this.imageFileToUpload = new File(
              [this.imageFile],
              this.imageFile.name
            );
            formData.append('file', this.imageFileToUpload);
            formData.append('typeEntity', 'antacademico');
            formData.append('idEntity', res.toString());
            return this.fileService.uploadFile(formData);
          })
        )
        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'New Ant Academicos Added : ' +
                "'" +
                this.antacademicos_titulo?.value +
                "'",
              'green-snackbar',
              'x'
            );
            this.form.markAsUntouched();
            this.router.navigate(['/']);
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
        this.noImageUpload = false;
      }
    }
  }

  ngOnInit(): void {
    this.noImageUpload = true;
    this.autorService.getAll().subscribe({
      next: (response) => {
        this.PageLoading = 'hidden';
        this.datosAutor = response;
        this.userName = this.datosAutor[0].username;
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
        openSnackBar(this._snackBar, `${error?.message}`, 'red-snackbar', 'x');
      },
    });

    this.EstadoAcademicoService.getAll().subscribe({
      next: (response) => {
        this.estados = response;
      },
    });
  }
}
