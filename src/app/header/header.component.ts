import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthentificated = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  onLogOut() {
    this.authService.signOut();  
  }

}
