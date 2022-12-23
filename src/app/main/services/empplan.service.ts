import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  employee,
  employeeDeleteReqDto,
  employeeSelectReqDto,
  employeeSelectResDto,
} from '../models/employee';
import {
  empplan,
  empplanDeleteReqDto,
  empplanSelectReqDto,
  empplanSelectResDto,
} from '../models/empplan';

@Injectable({
  providedIn: 'root',
})
export class EmpPlanService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/empplan';
  }
  async select(req: empplanSelectReqDto): Promise<Array<empplanSelectResDto>> {
    var result: Array<empplanSelectResDto> = [];

    try {
      var postData: ActionReq<empplanSelectReqDto> =
        new ActionReq<empplanSelectResDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<empplanSelectResDto>>>(
          this._baseUrl + '/Select',
          postData
        )
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async insert(req: empplan): Promise<empplan> {
    var result: empplan = new empplan();
    try {
      var postData: ActionReq<empplan> = new ActionReq<empplan>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<empplan>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: empplan): Promise<empplan> {
    var result: empplan = new empplan();
    try {
      var postData: ActionReq<empplan> = new ActionReq<empplan>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<empplan>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: empplanDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<empplanDeleteReqDto> =
        new ActionReq<empplanDeleteReqDto>();
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

  async deleteBulk(req: Array<empplanDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<empplanDeleteReqDto>> = new ActionReq<
        Array<empplanDeleteReqDto>
      >();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/DeleteBulk',
          postData
        )
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }

  async updateBulk(req: empplan[]): Promise<boolean> {
    var result: boolean = false;

    try {
      var postData: ActionReq<empplan[]> = new ActionReq<empplan[]>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/UpdateBulk',
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
