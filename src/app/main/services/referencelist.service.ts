import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  referencelist,
  referencelistDeleteReqDto,
  referencelistSelectReqDto,
  referencelistSelectResDto,
} from '../models/referencelist';

@Injectable({
  providedIn: 'root',
})
export class ReferencelistService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/Referencelist';
  }
  async select(
    req: referencelistSelectReqDto
  ): Promise<Array<referencelistSelectResDto>> {
    var result: Array<referencelistSelectResDto> = [];
    try {
      var postData: ActionReq<referencelistSelectReqDto> =
        new ActionReq<referencelistSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<referencelistSelectResDto>>>(
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
  async insert(req: referencelist): Promise<referencelist> {
    var result: referencelist = new referencelist();
    try {
      var postData: ActionReq<referencelist> = new ActionReq<referencelist>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<referencelist>>(
          this._baseUrl + '/Insert',
          postData
        )
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: referencelist): Promise<referencelist> {
    var result: referencelist = new referencelist();
    try {
      var postData: ActionReq<referencelist> = new ActionReq<referencelist>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<referencelist>>(
          this._baseUrl + '/Update',
          postData
        )
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: referencelistDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<referencelistDeleteReqDto> =
        new ActionReq<referencelistDeleteReqDto>();
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

  async deleteBulk(req: Array<referencelistDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<referencelistDeleteReqDto>> = new ActionReq<
        Array<referencelistDeleteReqDto>
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
  async ImportBulk(req: Array<referencelist>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<referencelist>> = new ActionReq<
        Array<referencelist>
      >();
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
}
