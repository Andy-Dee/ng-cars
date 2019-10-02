import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(
    private http: HttpClient
  ) { }

  signUp(email: string, password: string) {
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoEWcNcY3gaE6baWdzP48zj1-vdSAT-f4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(
      catchError(this.handleError)
    )
  }

  signIn(email: string, password: string) {
    return this.http
      .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoEWcNcY3gaE6baWdzP48zj1-vdSAT-f4', {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError)
      )
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
