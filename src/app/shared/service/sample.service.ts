import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActionReq } from '../models/actionreq.model';
import { ActionRes } from '../models/actionres.model';
import {
  Sample,
  SampleDeleteReqDto,
  SampleSelectReqDto,
  SampleSelectResDto,
} from '../models/sample.model';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/Sample';
  }
  async select(req: SampleSelectReqDto): Promise<Array<SampleSelectResDto>> {
    var result: Array<SampleSelectResDto> = [];
    try {
      var postData: ActionReq<SampleSelectReqDto> =
        new ActionReq<SampleSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<SampleSelectResDto>>>(
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
  async insert(req: Sample): Promise<Sample> {
    var result: Sample = new Sample();
    try {
      var postData: ActionReq<Sample> = new ActionReq<Sample>();

      var resp = await firstValueFrom(
        this.http.post<ActionRes<Sample>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: Sample): Promise<Sample> {
    var result: Sample = new Sample();
    try {
      var postData: ActionReq<Sample> = new ActionReq<Sample>();
      postData.item = req;
      var resp = await firstValueFrom(this.http
        .post<ActionRes<Sample>>(this._baseUrl + '/Update', postData))
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: SampleDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<SampleDeleteReqDto> = new ActionReq<SampleDeleteReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(await this.http
        .post<ActionRes<boolean>>(this._baseUrl + '/Delete', postData))
        
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
}
