import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import {
  Auth,
  AuthLoginReqDto,
  AuthLoginResDto,
  AuthLogoutReqDto,
} from 'src/app/main/models/auth';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import * as _ from 'lodash';
import { Users } from 'src/app/main/models/user';
import { Token } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _baseUrl: string;
  constructor(
    private _storageService: StorageService,
    private _router: Router,
    private http: HttpClient,
    private _toastrService: ToastrService
  ) {
    this._baseUrl = environment.baseUrl + '/api/Auth';
  }
  // logout() {
  //   this._storageService.AccessToken$.next('');
  //   this._router.navigate(['/login']);
  // }
  userData = new BehaviorSubject<Users | null>(null);
  // jwtService: JwtHelperService = new JwtHelperService();

  async SignUp(req: Auth) {
    let result: Auth = new Auth();
    try {
      let postData: ActionReq<Auth> = new ActionReq<Auth>();
      postData.item = req;

      let resp = await firstValueFrom(
        this.http.post<ActionRes<Auth>>(this._baseUrl + '/Signup', postData)
      );
      if (resp.item == null) {
        this._toastrService.error('E-mail Already Taken');
      }
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }

  async Login(req: AuthLoginReqDto): Promise<AuthLoginResDto> {
    let result: AuthLoginResDto = new AuthLoginResDto();

    try {
      let postData: ActionReq<AuthLoginReqDto> =
        new ActionReq<AuthLoginReqDto>();
      postData.item = req;

      let resp = await firstValueFrom(
        this.http.post<ActionRes<AuthLoginResDto>>(
          this._baseUrl + '/login',
          postData
        )
      );
      if (resp.item == null) {
        this._toastrService.error('Invalid User Credential');
      }
      if (resp.item) {
        result = resp.item;
      }
    } catch (error) {
      throw error;
    }
    return result;
  }

  async Logout(req: AuthLogoutReqDto): Promise<boolean> {
    let result: boolean = false;
    try {
      let postData: ActionReq<AuthLogoutReqDto> =
        new ActionReq<AuthLogoutReqDto>();
      postData.item = req;
      let resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(this._baseUrl + `/logout`, postData)
      );
      if (resp.item) {
        result = resp.item;
        // this._storageService.AccessToken$.next('');
        localStorage.clear();
        this._router.navigate(['/login']);
      }
    } catch (error) {
      throw error;
    }
    return result;
  }

  getAccessToken() {
    var token = localStorage.getItem('accesstoken');
    return token;
  }

  // getAccessToken(): string {
  //   let localStorageToken = localStorage.getItem('accesstoken');

  //   if (localStorageToken) {
  //     let token = JSON.parse(localStorageToken) as AuthLoginResDto;
  //     let isTokenExpired = this.jwtService.isTokenExpired(token.accesstoken);

  //     if (isTokenExpired) {
  //       this.userData.next(null);
  //       return '';
  //     }

  //     let userInfo = this.jwtService.decodeToken(token.accesstoken) as Users;
  //     this.userData.next(userInfo);
  //     return token.accesstoken;
  //   }
  //   return '';
  // }

  refreshAccessToken() {
    let req = new AuthLoginResDto();
    const refreshtoken = localStorage.getItem('refreshtoken') || '';
    req.refreshtoken = refreshtoken;

    var request: ActionReq<AuthLoginResDto> = new ActionReq<AuthLoginResDto>();
    request.item = req;

    return this.http
      .post<ActionReq<AuthLoginResDto>>(
        this._baseUrl + '/RefreshToken',
        request
      )
      .pipe(
        switchMap((resp) => {
          if (resp.item == null) {
            throwError(() => ({
              message: 'Error refreshing token',
            }));
          }

          return of(resp.item);
        }),
        catchError((err: any) => {
          return throwError(() => ({
            message: 'Error refreshing token',
          }));
        })
      );
    // let resp: any = this.http
    //   .post(this._baseUrl + '/refreshtoken', request)
    //   .pipe(
    //     map((data: any) => {
    //       return data;
    //     }),
    //     catchError((error) => {
    //       return throwError(() => 'Captial not found!');
    //     })
    //   );
    // return resp.item.refreshtoken;
  }
}
