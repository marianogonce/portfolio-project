import { Component, OnInit } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'social-media-container',
  templateUrl: './social-media-container.component.html',
  styleUrls: ['./social-media-container.component.css']
})
export class SocialMediaContainerComponent implements OnInit {
  
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  constructor() { }

  ngOnInit(): void {
  }

}
