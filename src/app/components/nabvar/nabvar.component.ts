import { Component, OnInit } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';




@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  

  
  faLinkedin=faLinkedin;

  constructor(public service: AuthService) { }
  


  ngOnInit(): void {
 
  }


}
