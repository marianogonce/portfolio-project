import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css'],
})
export class AddProjectFormComponent implements OnInit {
  form = new FormGroup({
    proyecto_titulo: new FormControl('', Validators.required),
    proyecto_descripcion: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    proyecto_fecha: new FormControl('', Validators.required),
    link_repo_github: new FormControl('', Validators.required),
  });

  get proyecto_titulo() {
    return this.form.get('proyecto_titulo');
  }

  get proyecto_descripcion() {
    return this.form.get('proyecto_descripcion');
  }

  get summary() {
    return this.form.get('summary');
  }
  get proyecto_fecha() {
    return this.form.get('proyecto_fecha');
  }
  get link_repo_github() {
    return this.form.get('link_repo_github');
  }

  constructor(
    public projectoService: ProjectsService,
    public autorService: AutorService,
    public fileService: FileServiceService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  PageLoading: string = 'visible';
  loadingRequest: string = 'hidden';
  invalidAdd: string = 'hidden';

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
      this.projectoService
        .create({
          proyecto_id: '',
          proyecto_titulo: this.proyecto_titulo?.value,
          proyecto_descripcion: this.proyecto_descripcion?.value,
          summary: this.summary?.value,
          proyecto_fecha: this.proyecto_fecha?.value,
          img_ext: this.imageFile.name.match(/\.[0-9a-z]+$/i)[0],
          link_repo_github: this.link_repo_github?.value,
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
              'New Project Added : ' + "'" + this.proyecto_titulo?.value + "'",
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
