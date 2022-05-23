import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HardskillsService } from 'src/app/services/hardskillsService/hardskills.service';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { HardskillLevelService } from 'src/app/services/hardskillLevelService/hardskill-level.service';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'update-hardskill-form',
  templateUrl: './update-hardskill-form.component.html',
  styleUrls: ['./update-hardskill-form.component.css'],
})
export class UpdateHardskillFormComponent implements OnInit {
  Hardskillform = new FormGroup({
    hardskill_descripcion: new FormControl('', Validators.required),
    hardskill_type: new FormControl('', Validators.required),
    hardskill_level: new FormControl('1', Validators.required),
  });

  get hardskill_descripcion() {
    return this.Hardskillform.get('hardskill_descripcion');
  }

  get hardskill_type() {
    return this.Hardskillform.get('hardskill_type');
  }

  get hardskill_level() {
    return this.Hardskillform.get('hardskill_level');
  }

  PageLoading: string = 'visible';
  loadingRequest: string = 'hidden';
  invalidAdd: string = 'hidden';
  datosAutor: any;
  userName: string = '';
  levels: any;
  hardskillToUpdateId: any;
  hardskillToUpdateData: any;

  constructor(
    public hardSkillsService: HardskillsService,
    public autorService: AutorService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private hsLevelService: HardskillLevelService,
    private route: ActivatedRoute
  ) {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.Hardskillform.valid) {
      this.loadingRequest = 'visible';
      this.hardSkillsService
        .update({
          hardskill_id: parseInt(this.hardskillToUpdateId),
          hardskill_descripcion: this.hardskill_descripcion?.value,
          hardskill_type: this.hardskill_type?.value,
          hardskill_level: this.hardskill_level?.value,
          autor: this.userName,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'HardSkill Updated : ' +
                "'" +
                this.hardskill_descripcion?.value +
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
      this.Hardskillform.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        if (params.get('idhardskill')) {
          this.hardskillToUpdateId = params.get('idhardskill');
        }
      },
    });
    let observablesToSubscribe: Observable<any>[] = [];
    let getAutor = this.autorService.getAll();
    let getHsLevel = this.hsLevelService.getAll();
    let getHs = this.hardSkillsService.getAll();
    observablesToSubscribe.push(getAutor, getHsLevel, getHs);
    forkJoin(observablesToSubscribe).subscribe({
      next: (response) => {
        this.PageLoading = 'hidden';
        this.datosAutor = response[0];
        this.userName = this.datosAutor[0].username;
        this.levels = response[1];
        let hardskillArray = response[2];
        this.hardskillToUpdateData =
          hardskillArray[
            hardskillArray
              .map((e: any) => e.hardskill_id)
              .indexOf(parseInt(this.hardskillToUpdateId))
          ];
        if (!this.hardskillToUpdateData) {
          this.router.navigate(['/notfound']);
        }
        this.hardskill_descripcion?.setValue(
          this.hardskillToUpdateData.hardskill_descripcion
        );
        this.hardskill_type?.setValue(
          this.hardskillToUpdateData.hardskill_type
        );
        this.hardskill_level?.setValue(
          this.hardskillToUpdateData.hardskill_level
        );
      },
      error: (error: any) => {
        this.router.navigate([
          `error/${error.error.status}/${error.error.error}`,
        ]);
      },
    });
  }
}
