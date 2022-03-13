import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autorService/autor.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  
  PageLoading : string = "visible";
  havePadding :any
  autor : any = ""
  
  constructor(public breakpointObserver: BreakpointObserver, 
    private autorService: AutorService, private router: Router) { }

  ngOnInit(): void {
    this.autorService.getAll()
    .subscribe({
      next: response => {
      this.autor = response;
      this.autor = this.autor[0];
      this.PageLoading = "hidden";
    }, 
  error: (error: any) => {
    this.router.navigate([`error/${error.error.status}/${error.error.error}`]);
  }
});

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
