import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap(
        user => {
          if (!user) {
            console.log('!user ' + req);
            return next.handle(req);
          }
          console.log('user ' + req);
          return next.handle(req);
          // const modifiedReq = req.clone({
          //   params: new HttpParams().set('auth', user.displayName)
          // });
          // return next.handle(modifiedReq);
        }
      )
    );
    
  }

}
