import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  source,
  sourceDeleteReqDto,
  sourceSelectReqDto,
  sourceSelectResDto,
} from '../models/source';

@Injectable({
  providedIn: 'root',
})
export class ImportsourceService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/source';
  }
  async select(req: sourceSelectReqDto): Promise<Array<sourceSelectResDto>> {
    var result: Array<sourceSelectResDto> = [];
    try {
      var postData: ActionReq<sourceSelectReqDto> =
        new ActionReq<sourceSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<sourceSelectResDto>>>(
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
  async insert(req: source): Promise<source> {
    var result: source = new source();
    try {
      var postData: ActionReq<source> = new ActionReq<source>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<source>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: source): Promise<source> {
    var result: source = new source();
    try {
      var postData: ActionReq<source> = new ActionReq<source>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<source>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: sourceDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<sourceDeleteReqDto> =
        new ActionReq<sourceDeleteReqDto>();
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

  async deleteBulk(req: Array<sourceDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<sourceDeleteReqDto>> = new ActionReq<
        Array<sourceDeleteReqDto>
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
  async ImportBulk(req: Array<source>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<source>> = new ActionReq<Array<source>>();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/ImportBulk',
          postData
        )
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async UploadBulkInvoice(req: Array<sourceSelectResDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<source>> = new ActionReq<Array<source>>();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/UploadBulkInvoice',
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
