import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SoftskillsService } from 'src/app/services/softSkillsService/softskills.service';
import { AutorService } from 'src/app/services/autorService/autor.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { openSnackBar } from '../../tools/OpenSnackbarfunction';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-softskill-form',
  templateUrl: './add-softskill-form.component.html',
  styleUrls: ['./add-softskill-form.component.css']
})
export class AddSoftskillFormComponent implements OnInit {


  form = new FormGroup({
    'softskill_descripcion': new FormControl("", Validators.required)
  })

  get softskill_descripcion() {
    return this.form.get('softskill_descripcion');
  }

  constructor(
    public softSkillsService: SoftskillsService, 
    public autorService : AutorService, 
    private _snackBar: MatSnackBar,
    public router: Router) { }

    PageLoading : string = "visible";
    loadingRequest : string = "hidden";
    invalidAdd : string = "hidden"; 

    private datosAutor: any; 
    private userName: string = "";

    onSubmit(event: Event) {
      event.preventDefault;
      if (this.form.valid) {
        this.loadingRequest = "visible";
        this.softSkillsService.create({softskill_Id: "", softskill_descripcion:this.softskill_descripcion?.value, autor: this.userName})
        .subscribe({
          next: response => {
            this.loadingRequest = "hidden";
            openSnackBar(this._snackBar, "New SoftSkill Added : " + "'" + this.softskill_descripcion?.value + "'", "green-snackbar", "x" );
            this.form.reset();
            this.form.markAsUntouched();
          }, 
        error: (error: any) => {
          this.loadingRequest = "hidden";
          this.invalidAdd = "visible";
          openSnackBar(this._snackBar, `${error.error.error}`, "red-snackbar", "x" );
        }
      })
      } else {
        this.form.markAllAsTouched();
      }
    }


  ngOnInit(): void {
    this.autorService.getAll()
    .subscribe({
      next: response => {
      this.PageLoading = "hidden";
      this.datosAutor = response;
      this.userName = this.datosAutor[0].user_name;
    }, 
    error: (error:any) => {
      this.router.navigate([`error/${error.error.status}/${error.error.error}`]);
      openSnackBar(this._snackBar, `${error.error.error}`, "red-snackbar", "x" );
    }});
  }

}
