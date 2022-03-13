import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'main-container-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit   {
  
  havePadding :any
  faArrowDown = faArrowDown;

  constructor(
    public breakpointObserver: BreakpointObserver) { 
  }

  ngOnInit(): void {  

    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.havePadding = true;
        } else {
          this.havePadding = false;
        }
      });

  }



  }


  
