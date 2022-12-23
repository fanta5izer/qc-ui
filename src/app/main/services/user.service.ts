import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  ChangepwdReq,
  Users,
  UsersDeleteReqDto,
  UsersSelectReqDto,
  UsersSelectResDto,
} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _baseUrl: string;
  constructor(
    private http: HttpClient,
    private toaster_service: ToastrService
  ) {
    this._baseUrl = environment.baseUrl + '/api/Users';
  }
  // async select(req: UsersSelectReqDto) {
  //   return this.http.post(this._baseUrl + '/Select', req).pipe(
  //     map((data) => {
  //       return data;
  //     }),
  //     catchError((error) => {
  //       return throwError(() => 'Capital not found!');
  //     })
  //   );
  // }
  async select(req: UsersSelectReqDto): Promise<Array<UsersSelectResDto>> {
    var result: Array<UsersSelectResDto> = [];
    try {
      var postData: ActionReq<UsersSelectReqDto> =
        new ActionReq<UsersSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<UsersSelectResDto>>>(
          this._baseUrl + '/Select',
          postData
        )
      );
      // if (resp.item == null) {
      //   this.toaster_service.error('Invalid User Credential');
      // }

      if (resp.item) {
        result = resp.item;
      }
    } catch (error) {
      throw error;
    }
    return result;
  }
  async insert(req: Users): Promise<Users> {
    var result: Users = new Users();
    try {
      // req.orgid = Number(localStorage.getItem('orgid') || '');
      var postData: ActionReq<Users> = new ActionReq<Users>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<Users>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: Users): Promise<Users> {
    var result: Users = new Users();
    try {
      var postData: ActionReq<Users> = new ActionReq<Users>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Users>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }

  async resetPassword(req: ChangepwdReq): Promise<boolean> {
    var result: boolean = false
    try {
      var postData: ActionReq<ChangepwdReq> = new ActionReq<ChangepwdReq>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(this._baseUrl + '/RestPassword', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
    
  }

  
  async delete(req: UsersDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<UsersDeleteReqDto> =
        new ActionReq<UsersDeleteReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/Delete',
          postData
        )
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
}
