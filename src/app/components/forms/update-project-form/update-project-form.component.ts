import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { FileServiceService } from 'src/app/services/fileService/file-service.service';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { url } from 'src/app/services/url';

@Component({
  selector: 'app-update-project-form',
  templateUrl: './update-project-form.component.html',
  styleUrls: ['./update-project-form.component.css'],
})
export class UpdateProjectFormComponent implements OnInit {
  projectToUpdateId: any;
  projectArray: any;
  projectToUpdateData: any;

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
    public projectService: ProjectsService,
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
      this.projectService
        .update({
          proyecto_id: this.projectToUpdateData.proyecto_id,
          proyecto_titulo: this.proyecto_titulo?.value,
          proyecto_descripcion: this.proyecto_descripcion?.value,
          summary: this.summary?.value,
          proyecto_fecha: this.proyecto_fecha?.value,
          img_url: this.projectToUpdateData.img_url,
          link_repo_github: this.link_repo_github?.value,
          autor: this.userName,
          img_deletehash: this.projectToUpdateData.img_deletehash,
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
              formData.append('typeEntity', 'project');
              formData.append('idEntity', res.toString());
              return this.fileService
                .deleteFile(this.projectToUpdateData.img_deletehash)
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
              'Project updated : ' + "'" + this.proyecto_titulo?.value + "'",
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
        if (param.get('projectId')) {
          this.projectToUpdateId = param.get('projectId');
        }
      },
    });

    this.projectService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.projectArray = response;
        this.projectToUpdateData =
          this.projectArray[
            this.projectArray
              .map((e: any) => e.proyecto_id)
              .indexOf(parseInt(this.projectToUpdateId))
          ];
        if (!this.projectToUpdateData) {
          this.router.navigate(['/notfound']);
        }
        this.proyecto_titulo?.setValue(
          this.projectToUpdateData.proyecto_titulo
        );
        this.proyecto_descripcion?.setValue(
          this.projectToUpdateData.proyecto_descripcion
        );
        this.summary?.setValue(this.projectToUpdateData.summary);
        this.proyecto_fecha?.setValue(this.projectToUpdateData.proyecto_fecha);
        this.link_repo_github?.setValue(
          this.projectToUpdateData.link_repo_github
        );

        this.preview = this.projectToUpdateData.img_url;
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
