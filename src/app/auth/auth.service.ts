import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;
  userData$: Observable<User>;

  constructor(    
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>('users/' + user.uid).valueChanges();          
        } else {
          return of(null)
        }
      })
    )    
  }
  
  async signUp(email: string, password: string) {
    try {
      const credential = await this.afAuth.auth
        .createUserWithEmailAndPassword(email, password);
      console.log('Signup successfully!');
      this.router.navigate(['/profile']);
      return this.updateUserData(credential.user);
    }
    catch (error) {
      return this.handleError(error);
    }
  }

  async logIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.auth
        .signInWithEmailAndPassword(email, password);
      console.log('Login successfully!');
      this.router.navigate(['/profile']);
      console.log(credential.user);
      console.log(this.user$);
      return this.updateUserDataLogin(credential.user);
    }
    catch (error) {
      return this.handleError(error);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      return console.log('Password update email sent');
    }
    catch (error) {
      return this.handleError(error);
    }
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(
        () => {
          this.router.navigate(['/auth']);
        }
      )
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(data, {merge: true});
  }

  updateUserDataLogin(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(data, {merge: true});
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
