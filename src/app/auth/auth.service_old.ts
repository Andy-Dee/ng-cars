// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, tap, switchMap } from 'rxjs/operators';
// import { throwError, Subject, BehaviorSubject, of, Observable } from 'rxjs';
// import { User } from './user.model';
// import { environment } from 'src/environments/environment.prod';
// import { Router } from '@angular/router';
// import { CarsService } from '../core/cars.service';

// import * as firebase  from 'firebase/app';

// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// export interface AuthResponseData {
//   displayName: string;
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   //registered?: boolean;
// }

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService {
//   user = new BehaviorSubject<User>(null);
//   user$ = this.user.asObservable();  
//   tokenExpirationTimer: any;

//   constructor(
//     private http: HttpClient,
//     private carsService: CarsService,    
//     private router: Router,
//     private afAuth: AngularFireAuth
//   ) {}


//   checkAuth() {
//     firebase.auth().onAuthStateChanged(
//       user => {
//         if (user) {
//           console.log('User is sign-in');
//         } else {
//           this.autoLogIn();
//           console.log('User is not sign-in');
//         }
//       }
//     )
//   }

//   getCurrentUser() : any {
//     const fireData = firebase.auth().currentUser;
//     console.log(fireData);
//     const currentUser$ = new Observable(data => {
//       data.next(fireData);
//       console.log(fireData);
//     });
    
//     return currentUser$;   
//   }

//   changeUserData(name: string, email: string) {
//     firebase.auth().currentUser.updateProfile({
//       displayName: name
//     })
//     .then(
//       () => {
//         console.log('Name updated to ' + name);
//       }
//     )
//     .catch(
//       err => console.log(err)
//     );

//     firebase.auth().currentUser.updateEmail(email)
//     .then(
//       () => console.log('Name updated to ' + email)
//     )
//     .catch(
//       err => console.log(err)
//     );

//   }

//   signUp(email: string, password: string) {
//     return this.http
//     .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseConfig.apiKey,
//       {
//         email: email,
//         password: password,
//         returnSecureToken: true
//       })
//     .pipe(
//       catchError(this.handleError),
//       tap(
//         responseData => {
//           this.handleAuthentification(
//             responseData.email,
//             responseData.localId,
//             responseData.idToken,
//             +responseData.expiresIn
//           );
//         }
//       )
//     )
//   }

//   signIn(email: string, password: string) {
//     return this.http
//       .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseConfig.apiKey, {
//         email: email,
//         password: password,
//         returnSecureToken: true
//       })
//       .pipe(
//         catchError(this.handleError),
//         tap(
//           responseData => {
//             this.handleAuthentification(
//               responseData.email,
//               responseData.localId,
//               responseData.idToken,
//               +responseData.expiresIn
//             );
//           }
//         )
//       )
//   }

//   autoLogIn() {
    
//     const userData: {
//       email: string;
//       id: string;
//       _token: string;
//       _tokenExpirationDate: string;
//     } = JSON.parse(localStorage.getItem('UserData'));

//     if (!userData) {
//       return;
//     }

//     const loadedUser = new User(
//       userData.email,
//       userData.id,
//       userData._token,
//       new Date(userData._tokenExpirationDate)
//     );

//     if (loadedUser.token) {      
//       this.user.next(loadedUser);
//       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
//       this.autoLogOut(expirationDuration); 
//       console.log(expirationDuration);     
//     }
//   }

//   logOut() {
//     this.user.next(null);
//     this.carsService.carsChanged.next(this.carsService.cars.slice());
//     this.carsService.cars = [];
//     console.log(this.carsService.cars);
//     this.router.navigate(['/auth']);
//     localStorage.removeItem('UserData');
//     if (this.tokenExpirationTimer) {
//       clearTimeout(this.tokenExpirationTimer);
//     }
//     this.tokenExpirationTimer = null;
//   }

//   autoLogOut(expirationDuration: number) {
//     this.tokenExpirationTimer = setTimeout(() => {
//       this.logOut();
//     }, expirationDuration)
//   }

//   storeUserData(user: User) {        
//     this.http
//         .put<User>(environment.firebaseConfig.databaseURL + '/' + this.user.value.id + '/userdata.json', user)
//         .subscribe();
//   }

//   loadUserData() {
//     return this.http
//         .get<User>(environment.firebaseConfig.databaseURL + '/' + this.user.value.id + '/userdata.json')
//         .pipe(
//           tap(
//             userUpdated => {
//               this.user.next(userUpdated);
//               console.log(userUpdated);
//             }
//           )
//         );
//   }

//   handleAuthentification(
//     email: string,
//     userId: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//     const user = new User(
//       email, 
//       userId, 
//       token,
//       expirationDate
//       );
//     this.user.next(user);
//     this.storeUserData(user);
//     this.autoLogOut(expiresIn * 1000);
//     localStorage.setItem('UserData', JSON.stringify(user));
//     console.log(user);
//   }

//   private handleError(errorResponse: HttpErrorResponse) {
//     let errorMessage = 'An error occured';
//     if (!errorResponse.error || !errorResponse.error.error) {
//       return throwError(errorMessage);
//     }
//     switch (errorResponse.error.error.message) {
//       case 'EMAIL_EXISTS':
//         errorMessage = 'This email already exists';
//       case 'EMAIL_NOT_FOUND':
//         errorMessage = 'This email does not exist';
//         break;
//       case 'INVALID_PASSWORD':
//         errorMessage = 'This password is not correct';
//         break;
//     }
//     return throwError(errorMessage);
//   }

// }
