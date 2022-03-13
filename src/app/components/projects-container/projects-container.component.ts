import { Component, OnInit } from '@angular/core';
import { ProjectsService, proyectType } from 'src/app/services/projectService/projects.service';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css']
})
export class ProjectsContainerComponent implements OnInit {
  
  faAtom = faAtom;
  listadoProyectos : proyectType[];
  pageProject : number = 1;

  constructor() {
     let service = new ProjectsService();
     this.listadoProyectos = service.getProyectos();
  }



  ngOnInit(): void {
  }

}
