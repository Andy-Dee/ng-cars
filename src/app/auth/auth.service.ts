import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
      catchError(
        errorResponse => {
          let errorMessage = 'An error occured';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
          }
          return throwError(errorMessage);
        }
      )
    )
  }

}
