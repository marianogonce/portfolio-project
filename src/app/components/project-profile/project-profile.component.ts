import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../tools/OpenSnackbarfunction';

@Component({
  selector: 'project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css'],
})
export class ProjectProfileComponent implements OnInit {
  PageLoading: string = 'visible';
  projectId: string | null = '';
  project: any;
  projectSelectedId: any;
  projectArray: any;
  projectSelectedData: any;
  projectImage: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private projectService: ProjectsService,
    public spinnerService: SpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        if (param.get('idProject')) {
          this.projectSelectedId = param.get('idProject');
        }
      },
    });

    this.projectService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.projectArray = response;
        this.projectSelectedData =
          this.projectArray[
            this.projectArray
              .map((e: any) => e.proyecto_id)
              .indexOf(parseInt(this.projectSelectedId))
          ];
        if (!this.projectSelectedData) {
          this.router.navigate(['/notfound']);
        }
        this.projectImage = this.projectSelectedData.img_url;
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error?.error?.error}`,
        ]);
        openSnackBar(
          this._snackBar,
          `${error.error.error}`,
          'red-snackbar',
          'x'
        );
      },
    });
  }
}
