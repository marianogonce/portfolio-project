import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HardskillsService } from 'src/app/services/hardskillsService/hardskills.service';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';
import { HardskillLevelService } from 'src/app/services/hardskillLevelService/hardskill-level.service';

@Component({
  selector: 'add-hardskill-form',
  templateUrl: './add-hardskill-form.component.html',
  styleUrls: ['./add-hardskill-form.component.css'],
})
export class AddHardskillFormComponent implements OnInit {
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

  constructor(
    public hardSkillsService: HardskillsService,
    public autorService: AutorService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private hsLevelService: HardskillLevelService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.Hardskillform.valid) {
      this.loadingRequest = 'visible';
      this.hardSkillsService
        .create({
          hardskill_Id: '',
          hardskill_descripcion: this.hardskill_descripcion?.value,
          hardskill_type: this.hardskill_type?.value,
          hardskill_level: this.hardskill_level?.value,
          autor: this.userName,
        })
        .subscribe({
          next: (response) => {
            console.log('next del formulario agregar hardskill');
            this.loadingRequest = 'hidden';
            openSnackBar(
              this._snackBar,
              'New HardSkill Added : ' +
                "'" +
                this.hardskill_descripcion?.value +
                "'",
              'green-snackbar',
              'x'
            );
            this.Hardskillform.reset();
            this.Hardskillform.markAsUntouched();
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
      },
    });

    this.hsLevelService.getAll().subscribe({
      next: (response) => {
        this.levels = response;
      },
    });
  }
}
