import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.css']
})
export class Error500Component implements OnInit {

  statusCode : string = "";
  statusDescription : string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe( {
      next: param => {
      if (param.get('statusdescription') && param.get('statuscode') ) {
        this.statusCode  = param.get('statuscode')! ;
        this.statusDescription  = param.get('statusdescription')!;
      }
    }})
    
  }

}
