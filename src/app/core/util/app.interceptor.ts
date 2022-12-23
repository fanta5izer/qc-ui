import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';
import { AuthService } from '../service/auth.service';
import { AuthLogoutReqDto } from 'src/app/main/models/auth';

import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AppInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  _baseUrl: string = '';

  constructor(
    public _storageService: StorageService,
    public _authService: AuthService,
    private http: HttpClient
  ) {
    this._baseUrl = environment.baseUrl + '/api/Auth';
  }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const Authorization = this._storageService.AccessToken$.getValue();
    return next
      .handle(request.clone(this.addAuthenticationToken(request)))
      .pipe(
        catchError((error) => {
          if (request.url.includes('login')) {
            this._authService.Logout(new AuthLogoutReqDto());
          }

          if (error.status !== 401) {
            return throwError(() => error);
          }

          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result) => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(request)))
            );
          } else {
            this.refreshTokenInProgress = true;

            this.refreshTokenSubject.next(null);

            // return this.refreshAccessToken().pipe(
            return this._authService.refreshAccessToken().pipe(
              switchMap((token) => {
                localStorage.setItem('accesstoken', token!.accesstoken);
                localStorage.setItem('refreshtoken', token!.refreshtoken);
                localStorage.setItem('user', JSON.stringify(token!.user));
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(token?.accesstoken);

                return next.handle(this.addAuthenticationToken(request));
              }),

              catchError((err: any) => {
                this.refreshTokenInProgress = false;
                this._authService.Logout(new AuthLogoutReqDto());
                return throwError(() => error);
              })
            );
          }
        })
      );

    // return throwError(() => error);
    //   })
    // );
  }

  addAuthenticationToken(request: any) {
    let Authorization = localStorage.getItem('accesstoken');

    if (!Authorization) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization,
      },
    });
  }
}
