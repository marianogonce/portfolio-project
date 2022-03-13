import { Component, OnInit } from '@angular/core';
import { SoftskillsService } from 'src/app/services/softSkillsService/softskills.service';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';
import { openSnackBar } from '../tools/OpenSnackbarfunction';



@Component({
  selector: 'softskills-container',
  templateUrl: './softskills-container.component.html',
  styleUrls: ['./softskills-container.component.css']
})
export class SoftskillsContainerComponent implements OnInit {
  
  faHandshake = faHandshake;
  public pageSoftSkill:number = 1;

  listadoDeSoftSkills : any[any] = [];
  listadoDeSoftSkillsAuxiliar : any[any] = [];

  constructor(private softskillService: SoftskillsService, private _snackBar: MatSnackBar) {

   }

   deletesoftSkill(event:any) {
     this.listadoDeSoftSkills = this.listadoDeSoftSkills.filter((item : any)=> item.softskill_Id !== event.id);
     this.softskillService.delete(event.id)
     .subscribe({
      next: response => {
        this.listadoDeSoftSkillsAuxiliar = this.listadoDeSoftSkills;
      openSnackBar(this._snackBar, " SoftSkill '" +  event.descripcion + " 'dropped", 'red-snackbar', "x" );
     },
      error: (error:any) => {
        openSnackBar(this._snackBar, `No se pudo eliminar la habilidad ${event.descripcion} por ${error.error.error}`, "red-snackbar", "x" );
        this.listadoDeSoftSkills = this.listadoDeSoftSkillsAuxiliar;
      }})
  }


  ngOnInit(): void {
    this.softskillService.getAll()
    .subscribe({
      next: response => {
        this.listadoDeSoftSkills = response;
        this.listadoDeSoftSkillsAuxiliar = response;
      }});
  }

}
