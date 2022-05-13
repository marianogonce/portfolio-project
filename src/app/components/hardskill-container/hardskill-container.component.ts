import { Component, OnInit } from '@angular/core';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { HardskillsService } from 'src/app/services/hardskillsService/hardskills.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../tools/OpenSnackbarfunction';

@Component({
  selector: 'hardskill-container',
  templateUrl: './hardskill-container.component.html',
  styleUrls: ['./hardskill-container.component.css'],
})
export class HardskillContainerComponent implements OnInit {
  public pageHardskill: number = 1;

  faCalculator = faCalculator;
  listadoHardSkills: any[any] = [];
  listadoHardSkillsAux: any[any] = [];

  constructor(
    private hardSkillsService: HardskillsService,
    private _snackBar: MatSnackBar
  ) {}

  deleteHardSkill(event: any) {
    this.listadoHardSkills = this.listadoHardSkills.filter(
      (item: any) => item.hardskill_id !== event.hardSkillId
    );
    this.hardSkillsService.delete(event.hardSkillId).subscribe({
      next: (response) => {
        this.listadoHardSkillsAux = this.listadoHardSkills;
        openSnackBar(
          this._snackBar,
          " HardSkill '" + event.hardSkillDescription + " 'dropped",
          'info-snackbar',
          'x'
        );
      },
      error: (error: any) => {
        openSnackBar(
          this._snackBar,
          `No se pudo eliminar la habilidad ${event.hardSkillDescription} por ${error?.message}`,
          'red-snackbar',
          'x'
        );
        this.listadoHardSkills = this.listadoHardSkillsAux;
      },
    });
  }

  ngOnInit(): void {
    this.hardSkillsService.getAll().subscribe({
      next: (response) => {
        this.listadoHardSkills = response;
        this.listadoHardSkillsAux = response;
      },
    });
  }
}
