import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spiner',
  templateUrl: './progress-spiner.component.html',
  styleUrls: ['./progress-spiner.component.css']
})
export class ProgressSpinerComponent implements OnInit {
  
  @Input() Isloading : string = "visible";

  constructor() { }

  ngOnInit(): void {
  }

}
