import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  
  @Input() projectImagenUrl : string = ""; 
  @Input() projectTitle: string= ""; 
  @Input() projectSummary: string= ""; 
  @Input() projectDate: string= ""; 
  @Input() projectId : string = "";
 
  constructor() { }

  ngOnInit(): void {
  }

}
