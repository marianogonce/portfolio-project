import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { AntecedentesLaboralesService } from 'src/app/services/antLaboralesService/antecedentes-laborales.service';
import { EstadoAcademicoService } from 'src/app/services/antAcademicosEstadoService/estado-academico.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-ant-laboral-form',
  templateUrl: './add-ant-laboral-form.component.html',
  styleUrls: ['./add-ant-laboral-form.component.css'],
})
export class AddAntLaboralFormComponent implements OnInit {
  form = new FormGroup({
    antlaborales_puesto: new FormControl('', Validators.required),
    antlaborales_empleador: new FormControl('', Validators.required),
    antlaborales_lugar: new FormControl('', Validators.required),
    antlaborales_fecha_inicio: new FormControl('', Validators.required),
    antlaborales_fecha_final: new FormControl('', Validators.required),
    antlaborales_descripcion: new FormControl('', Validators.required),
  });

  get antlaborales_puesto() {
    return this.form.get('antlaborales_puesto');
  }

  get antlaborales_empleador() {
    return this.form.get('antlaborales_empleador');
  }

  get antlaborales_lugar() {
    return this.form.get('antlaborales_lugar');
  }
  get antlaborales_fecha_inicio() {
    return this.form.get('antlaborales_fecha_inicio');
  }
  get antlaborales_fecha_final() {
    return this.form.get('antlaborales_fecha_final');
  }
  get antlaborales_descripcion() {
    return this.form.get('antlaborales_descripcion');
  }

  constructor(
    public AntecedentesLaboralesService: AntecedentesLaboralesService,
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
      this.AntecedentesLaboralesService.create({
        antlaborales_id: '',
        antlaborales_puesto: this.antlaborales_puesto?.value,
        antlaborales_empleador: this.antlaborales_empleador?.value,
        antlaborales_img_ext: this.imageFile.name.match(/\.[0-9a-z]+$/i)[0],
        antlaborales_lugar: this.antlaborales_lugar?.value,
        antlaborales_fecha_inicio: this.antlaborales_fecha_inicio?.value,
        antlaborales_fecha_final: this.antlaborales_fecha_final?.value,
        antlaborales_descripcion: this.antlaborales_descripcion?.value,
        autor: this.userName,
      })
        .pipe(
          mergeMap((res: any) => {
            const formData = new FormData();
            this.imageFileToUpload = new File(
              [this.imageFile],
              res.toString() + this.imageFile.name.match(/\.[0-9a-z]+$/i)[0]
            );
            formData.append('file', this.imageFileToUpload);
            return this.fileService.uploadFile(formData);
          })
        )
        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'New Ant Laboral Added : ' +
                "'" +
                this.antlaborales_puesto?.value +
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
  }
}
