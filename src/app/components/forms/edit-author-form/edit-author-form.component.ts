import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { forkJoin, Observable } from 'rxjs';
import { url } from 'src/app/services/url';

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
  public previewCV = '../../../assets/img/PdfImagen.png';
  public fileMessagePortada: any = 'Modifique foto de portada';
  public fileMessageProfilePicture: any = 'Modifique foto de perfil';
  public fileMessageCV: any = 'Modifique CV';
  public profileImage: any;
  public cv: any;
  public backgroundImage: any;
  private extensionesdeArchivosAnteriores: any;

  form = new FormGroup({
    frase_Portada: new FormControl(''),
    nombre_apellido: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    profesion: new FormControl('', Validators.required),
    radicacion: new FormControl('', Validators.required),
    descripcion_perfil: new FormControl('', Validators.required),
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
    let observableToSubscribe: Observable<unknown>[] = [];
    event.preventDefault;
    if (this.form.valid) {
      this.loadingRequest = 'visible';
      let updateAutor = this.autorService.update({
        username: this.authorData.username,
        password: this.authorData.password,
        email: this.authorData.email,
        nombre_apellido: this.nombre_apellido?.value,
        fecha_nacimiento: this.fecha_nacimiento?.value,
        profesion: this.profesion?.value,
        radicacion: this.radicacion?.value,
        descripcion_perfil: this.descripcion_perfil?.value,
        foto_perfil_ext: this.profileImage
          ? this.profileImage.name.match(/\.[0-9a-z]+$/i)[0]
          : this.authorData.foto_perfil_ext,
        img_portada_ext: this.backgroundImage
          ? this.backgroundImage.name.match(/\.[0-9a-z]+$/i)[0]
          : this.authorData.img_portada_ext,
        frase_Portada: this.frase_Portada?.value,
      });
      observableToSubscribe.push(updateAutor);
      if (this.backgroundImage || this.profileImage || this.cv) {
        let imageToUpload: File[] = [];
        let imagenesExtToUpload: string[] = [];
        let imagenesExtToDelete: string[] = [];
        if (this.backgroundImage) {
          imagenesExtToDelete.push(
            'backgroundpicture' +
              this.extensionesdeArchivosAnteriores.backgroundpicture
          );
          imagenesExtToUpload.push(
            'backgroundpicture' +
              this.backgroundImage.name.match(/\.[0-9a-z]+$/i)[0]
          );
          imageToUpload.push(this.backgroundImage);
        }
        if (this.cv) {
          imagenesExtToDelete.push('cv.pdf');
          imagenesExtToUpload.push('cv.pdf');
          imageToUpload.push(this.cv);
        }
        if (this.profileImage) {
          imagenesExtToDelete.push(
            'profilepicture' +
              this.extensionesdeArchivosAnteriores.profilepicture
          );
          imagenesExtToUpload.push(
            'profilepicture' + this.profileImage.name.match(/\.[0-9a-z]+$/i)[0]
          );
          imageToUpload.push(this.profileImage);
        }
        for (let i = 0; i < imageToUpload.length; i++) {
          const formData = new FormData();
          let imageFileToUpload = new File(
            [imageToUpload[i]],
            imagenesExtToUpload[i]
          );
          formData.append('file', imageFileToUpload);
          let deleteFile = this.fileService.deleteFile(imagenesExtToDelete[i]);
          let updateFile = this.fileService.uploadFile(formData);
          observableToSubscribe.push(deleteFile, updateFile);
        }
      }
      forkJoin(observableToSubscribe).subscribe({
        next: (response) => {
          this.loadingRequest = 'hidden';
          openSnackBar(
            this._snackBar,
            'Autor updated : ' + "'" + this.authorData.username + "'",
            'green-snackbar',
            'x'
          );
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
        this.previewCV = '../../../assets/img/PdfImagen.png';
        this.previewPortada =
          url +
          '/downloadFile/backgroundpicture' +
          this.authorData.img_portada_ext;
        this.previewProfilePicture =
          url +
          '/downloadFile/profilepicture' +
          this.authorData.foto_perfil_ext;
        this.frase_Portada?.setValue(this.authorData.frase_Portada);
        this.nombre_apellido?.setValue(this.authorData.nombre_apellido);
        this.fecha_nacimiento?.setValue(this.authorData.fecha_nacimiento);
        this.profesion?.setValue(this.authorData.profesion);
        this.radicacion?.setValue(this.authorData.radicacion);
        this.descripcion_perfil?.setValue(this.authorData.descripcion_perfil);

        this.extensionesdeArchivosAnteriores = {
          backgroundpicture: this.authorData.img_portada_ext,
          profilepicture: this.authorData.foto_perfil_ext,
        };
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
