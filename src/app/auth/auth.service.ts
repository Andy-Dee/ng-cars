import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  //registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.APIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(
      catchError(this.handleError),
      tap(
        responseData => {
          this.handleAuthentification(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }
      )
    )
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebase.APIKey, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(
          responseData => {
            this.handleAuthentification(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
          }
        )
      )
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('UserData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {      
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration); 
      console.log(expirationDuration);     
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('UserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  private handleAuthentification(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
          const user = new User(
            email, 
            userId, 
            token,
            expirationDate
            );
          this.user.next(user);
          this.autoLogOut(expiresIn * 1000);
          localStorage.setItem('UserData', JSON.stringify(user));
          console.log(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

}
