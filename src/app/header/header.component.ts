import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        //this.isAuthentificated = !user ? false : true;
        this.isAuthentificated = !!user;
      }
    );
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
