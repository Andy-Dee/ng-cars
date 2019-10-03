import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        //this.isAuthentificated = !user ? false : true;
        this.isAuthentificated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
