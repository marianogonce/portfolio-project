import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { SpinnerService } from 'src/app/services/spinnerService/spinner.service';


@Component({
  selector: 'project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {
  projectId : string | null = "";
  project : any; 


  constructor(private route: ActivatedRoute, public spinnerService: SpinnerService) { 

  }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe( param => {
      if (param.get('idProject')) {
        this.projectId = param.get('idProject');
      }
    })
    let service = new ProjectsService();
    if (this.projectId) {
      this.project = service.getProyectoById(this.projectId);
    }
  }


}
