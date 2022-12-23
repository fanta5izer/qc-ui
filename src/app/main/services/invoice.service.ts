import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  bill,
  billDeleteReqDto,
  billSelectReqDto,
  billSelectResDto,
} from '../models/bill';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/bill';
  }
  async select(req: billSelectReqDto): Promise<Array<billSelectResDto>> {
    var result: Array<billSelectResDto> = [];
    try {
      var postData: ActionReq<billSelectReqDto> =
        new ActionReq<billSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<billSelectResDto>>>(
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
  async insert(req: bill): Promise<bill> {
    var result: bill = new bill();
    try {
      var postData: ActionReq<bill> = new ActionReq<bill>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<bill>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: bill): Promise<bill> {
    var result: bill = new bill();
    try {
      var postData: ActionReq<bill> = new ActionReq<bill>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<bill>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: billDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<billDeleteReqDto> =
        new ActionReq<billDeleteReqDto>();
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

  async deleteBulk(req: Array<billDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<billDeleteReqDto>> = new ActionReq<
        Array<billDeleteReqDto>
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
}
