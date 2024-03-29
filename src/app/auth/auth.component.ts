import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.logIn(email, password);
      this.isLoading = false;
    } else {
      this.authService.signUp(email, password);
      this.isLoading = false;
    }

    form.reset();
  }

}
