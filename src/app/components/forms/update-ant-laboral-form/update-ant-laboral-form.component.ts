import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { AntecedentesLaboralesService } from 'src/app/services/antLaboralesService/antecedentes-laborales.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/app/services/url';

@Component({
  selector: 'app-update-ant-laboral-form',
  templateUrl: './update-ant-laboral-form.component.html',
  styleUrls: ['./update-ant-laboral-form.component.css'],
})
export class UpdateAntLaboralFormComponent implements OnInit {
  antLaboralToUpdateId: any;
  antecedentesLaboralesArray: any;
  antecedenteLaboralToUpdateData: any;

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
    public antecedentesLaboralesService: AntecedentesLaboralesService,
    public autorService: AutorService,
    public fileService: FileServiceService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  public PageLoading: string = 'visible';
  public loadingRequest: string = 'hidden';
  public invalidAdd: string = 'hidden';

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
      this.loadingRequest = 'visible';
      this.antecedentesLaboralesService
        .update({
          antlaborales_id: this.antecedenteLaboralToUpdateData.antlaborales_id,
          antlaborales_puesto: this.antlaborales_puesto?.value,
          antlaborales_empleador: this.antlaborales_empleador?.value,
          antlaborales_img_url:
            this.antecedenteLaboralToUpdateData.antlaborales_img_url,
          antlaborales_lugar: this.antlaborales_lugar?.value,
          antlaborales_fecha_inicio: this.antlaborales_fecha_inicio?.value,
          antlaborales_fecha_final: this.antlaborales_fecha_final?.value,
          antlaborales_descripcion: this.antlaborales_descripcion?.value,
          autor: this.userName,
          antlaborales_Img_deletehash:
            this.antecedenteLaboralToUpdateData.antlaborales_Img_deletehash,
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
              formData.append('typeEntity', 'antlaboral');
              formData.append(
                'idEntity',
                this.antecedenteLaboralToUpdateData.antlaborales_id
              );
              return this.fileService
                .deleteFile(
                  this.antecedenteLaboralToUpdateData
                    .antlaborales_Img_deletehash
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
            this.loadingRequest = 'hidden';
            this.router.navigate(['/']);
            openSnackBar(
              this._snackBar,
              'Ant Laboral updated : ' +
                "'" +
                this.antlaborales_puesto?.value +
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

    this.route.paramMap.subscribe({
      next: (param) => {
        if (param.get('antlaboralId')) {
          this.antLaboralToUpdateId = param.get('antlaboralId');
        }
      },
    });

    this.antecedentesLaboralesService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.antecedentesLaboralesArray = response;
        this.antecedenteLaboralToUpdateData =
          this.antecedentesLaboralesArray[
            this.antecedentesLaboralesArray
              .map((e: any) => e.antlaborales_id)
              .indexOf(parseInt(this.antLaboralToUpdateId))
          ];
        if (!this.antecedenteLaboralToUpdateData) {
          this.router.navigate(['/notfound']);
        }
        this.antlaborales_puesto?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_puesto
        );
        this.antlaborales_empleador?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_empleador
        );
        this.antlaborales_lugar?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_lugar
        );
        this.antlaborales_fecha_inicio?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_fecha_inicio
        );
        this.antlaborales_fecha_final?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_fecha_final
        );
        this.antlaborales_descripcion?.setValue(
          this.antecedenteLaboralToUpdateData.antlaborales_descripcion
        );

        this.preview = this.antecedenteLaboralToUpdateData.antlaborales_img_url;
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
