import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SoftskillsService } from 'src/app/services/softSkillsService/softskills.service';
import { ActivatedRoute } from '@angular/router';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-softskill-form',
  templateUrl: './edit-softskill-form.component.html',
  styleUrls: ['./edit-softskill-form.component.css'],
})
export class EditSoftskillFormComponent implements OnInit {
  PageLoading: string = 'visible';
  invalidUpdate: string = 'hidden';
  loadingRequest: string = 'hidden';
  softskillArray: any[] = [];
  sofskilltoUpdateId: any;
  softskillToUpdateData: any;

  form = new FormGroup({
    softskill_descripcion: new FormControl('', Validators.required),
  });

  get softskill_descripcion() {
    return this.form.get('softskill_descripcion');
  }

  constructor(
    public softSkillsService: SoftskillsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.loadingRequest = 'visible';
      this.softSkillsService
        .update({
          softskill_Id: this.softskillToUpdateData.softskill_Id,
          softskill_descripcion: this.softskill_descripcion?.value,
          autor: this.softskillToUpdateData.autor,
        })
        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            this.router.navigate(['/']);
            openSnackBar(
              this._snackBar,
              "Update SoftSkill  : '" +
                this.softskillToUpdateData.softskill_descripcion +
                " ' to '" +
                this.softskill_descripcion?.value +
                "'",
              'green-snackbar',
              'x'
            );
          },
          error: (error: any) => {
            this.loadingRequest = 'hidden';
            this.invalidUpdate = 'visible';
            openSnackBar(
              this._snackBar,
              `${error.error.error}`,
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
    this.route.paramMap.subscribe({
      next: (param) => {
        if (param.get('idSoftskill')) {
          this.sofskilltoUpdateId = param.get('idSoftskill');
        }
      },
    });

    this.softSkillsService.getAll().subscribe({
      next: (response: any) => {
        this.PageLoading = 'hidden';
        this.softskillArray = response;
        this.softskillToUpdateData =
          this.softskillArray[
            this.softskillArray
              .map((e) => e.softskill_Id)
              .indexOf(parseInt(this.sofskilltoUpdateId))
          ];
        this.softskill_descripcion?.setValue(
          this.softskillToUpdateData.softskill_descripcion
        );
        if (!this.softskillToUpdateData) {
          this.router.navigate(['/notfound']);
        }
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
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
