import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import {
  customer,
  customerDeleteReqDto,
  customerSelectReqDto,
  customerSelectResDto,
} from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/customer';
  }
  async select(
    req: customerSelectReqDto
  ): Promise<Array<customerSelectResDto>> {
    var result: Array<customerSelectResDto> = [];
    try {
      var postData: ActionReq<customerSelectReqDto> =
        new ActionReq<customerSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<customerSelectResDto>>>(
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
  async insert(req: customer): Promise<customer> {
    var result: customer = new customer();
    try {
      var postData: ActionReq<customer> = new ActionReq<customer>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<customer>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: customer): Promise<customer> {
    var result: customer = new customer();
    try {
      var postData: ActionReq<customer> = new ActionReq<customer>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<customer>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: customerDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<customerDeleteReqDto> =
        new ActionReq<customerDeleteReqDto>();
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

  async deleteBulk(req: Array<customerDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<customerDeleteReqDto>> = new ActionReq<
        Array<customerDeleteReqDto>
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

  async ImportBulkCustomer(req: Array<customer>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<customer>> = new ActionReq<
        Array<customer>
      >();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/ImportBulkCustomer',
          postData
        )
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }

    return result;
  }

  async selectSummary(
    req: customerSelectReqDto
  ): Promise<Array<customerSelectResDto>> {
    var result: Array<customerSelectResDto> = [];
    try {
      var postData: ActionReq<customerSelectReqDto> =
        new ActionReq<customerSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<customerSelectResDto>>>(
          this._baseUrl + '/Selectall',
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
