import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { forkJoin, mergeMap, Observable, of, concatMap } from 'rxjs';

@Component({
  selector: 'app-edit-author-form',
  templateUrl: './edit-author-form.component.html',
  styleUrls: ['./edit-author-form.component.css'],
})
export class EditAuthorFormComponent implements OnInit {
  authorData: any = '';
  PageLoading: string = 'visible';
  loadingRequest: string = 'hidden';
  invalidAdd: string = 'hidden';
  public previewPortada = '';
  public previewProfilePicture = '';
  public fileMessagePortada: any = 'Modifique foto de portada';
  public fileMessageProfilePicture: any = 'Modifique foto de perfil';
  public fileMessageCV: any = 'Modifique CV';
  public profileImage: any;
  public cv: any;
  public backgroundImage: any;

  form = new FormGroup({
    frase_Portada: new FormControl(''),
    nombre_apellido: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    profesion: new FormControl('', Validators.required),
    radicacion: new FormControl('', Validators.required),
    descripcion_perfil: new FormControl('', Validators.required),
    cv_url: new FormControl('', Validators.required),
  });

  get frase_Portada() {
    return this.form.get('frase_Portada');
  }
  get nombre_apellido() {
    return this.form.get('nombre_apellido');
  }
  get fecha_nacimiento() {
    return this.form.get('fecha_nacimiento');
  }
  get profesion() {
    return this.form.get('profesion');
  }
  get radicacion() {
    return this.form.get('radicacion');
  }
  get descripcion_perfil() {
    return this.form.get('descripcion_perfil');
  }

  get cv_url() {
    return this.form.get('cv_url');
  }

  getImageFilePortada(imageFile: any) {
    this.backgroundImage = imageFile;
  }

  getImageProfilePicture(imageFile: any) {
    this.profileImage = imageFile;
  }

  getCV(file: any) {
    this.cv = file;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.loadingRequest = 'visible';
      this.autorService
        .update({
          username: this.authorData.username,
          password: this.authorData.password,
          email: this.authorData.email,
          nombre_apellido: this.nombre_apellido?.value,
          fecha_nacimiento: this.fecha_nacimiento?.value,
          profesion: this.profesion?.value,
          radicacion: this.radicacion?.value,
          descripcion_perfil: this.descripcion_perfil?.value,
          foto_perfil_url: this.authorData.foto_perfil_url,
          img_portada_url: this.authorData.img_portada_url,
          frase_Portada: this.frase_Portada?.value,
          deletehash_perfil: this.authorData.deletehash_perfil,
          deletehash_portada: this.authorData.deletehash_portada,
          cv_url: this.cv_url?.value,
        })
        .pipe(
          mergeMap((res: any) => {
            if (this.backgroundImage || this.profileImage) {
              let imageToUpload: File[] = [];
              let typeEntity: string[] = [];
              let deletehashArray: string[] = [];
              if (this.backgroundImage) {
                imageToUpload.push(this.backgroundImage);
                typeEntity.push('portada');
                deletehashArray.push(this.authorData.deletehash_portada);
              }
              if (this.profileImage) {
                imageToUpload.push(this.profileImage);
                typeEntity.push('perfil');
                deletehashArray.push(this.authorData.deletehash_perfil);
              }
              let observableToSubscribe: Observable<unknown>[] = [];
              for (let i = 0; i < imageToUpload.length; i++) {
                const formData = new FormData();
                let imageFileToUpload = new File(
                  [imageToUpload[i]],
                  imageToUpload[i].name
                );
                formData.append('file', imageFileToUpload);
                formData.append('typeEntity', typeEntity[i]);
                formData.append('idEntity', 'marianogonce');
                observableToSubscribe.push(
                  this.fileService.deleteFile(deletehashArray[i]).pipe(
                    mergeMap((re: any) => {
                      return this.fileService.uploadFile(formData);
                    })
                  )
                );
              }
              return forkJoin(observableToSubscribe).pipe(
                mergeMap((r: any) => {
                  return of({});
                })
              );
            }

            return of({});
          })
        )

        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'Autor updated : ' + "'" + this.authorData.username + "'",
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

  constructor(
    public autorService: AutorService,
    public fileService: FileServiceService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.autorService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.authorData = response[0];
        this.previewPortada = this.authorData.img_portada_url;
        this.previewProfilePicture = this.authorData.foto_perfil_url;
        this.frase_Portada?.setValue(this.authorData.frase_Portada);
        this.nombre_apellido?.setValue(this.authorData.nombre_apellido);
        this.fecha_nacimiento?.setValue(this.authorData.fecha_nacimiento);
        this.profesion?.setValue(this.authorData.profesion);
        this.radicacion?.setValue(this.authorData.radicacion);
        this.descripcion_perfil?.setValue(this.authorData.descripcion_perfil);
        this.cv_url?.setValue(this.authorData.cv_url);
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
