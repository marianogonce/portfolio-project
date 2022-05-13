import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { url } from 'src/app/services/url';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() projectImagenExt: string = '';
  @Input() projectTitle: string = '';
  @Input() projectSummary: string = '';
  @Input() projectDate: string = '';
  @Input() projectId: string = '';

  @Output() newItemEvent = new EventEmitter();

  public projectImage: String = '';

  constructor(public authService: AuthService) {}

  deleteProject() {
    this.newItemEvent.emit({
      Id: this.projectId,
      titulo: this.projectTitle,
      imagenExt: this.projectImagenExt,
    });
  }

  ngOnInit(): void {
    this.projectImage =
      url + '/downloadFile/' + this.projectId + this.projectImagenExt;
  }
}
