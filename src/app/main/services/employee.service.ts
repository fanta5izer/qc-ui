import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { customer } from '../models/customer';
import {
  employee,
  employeeDeleteReqDto,
  employeeSelectReqDto,
  employeeSelectResDto,
  employeeUpdateReqDto,
} from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/Employee';
  }
  async select(
    req: employeeSelectReqDto
  ): Promise<Array<employeeSelectResDto>> {
    var result: Array<employeeSelectResDto> = [];
    try {
      var postData: ActionReq<employeeSelectReqDto> =
        new ActionReq<employeeSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<employeeSelectResDto>>>(
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
  async insert(req: employee): Promise<employee> {
    var result: employee = new employee();
    try {
      var postData: ActionReq<employee> = new ActionReq<employee>();
      postData.item = req;

      var resp = await firstValueFrom(
        this.http.post<ActionRes<employee>>(this._baseUrl + '/Insert', postData)
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async update(req: employee): Promise<employee> {
    var result: employee = new employee();
    try {
      var postData: ActionReq<employee> = new ActionReq<employee>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<employee>>(this._baseUrl + '/Update', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }

  async updateAll(req: employeeUpdateReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<employeeUpdateReqDto> =
        new ActionReq<employeeUpdateReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/UpdateAll',
          postData
        )
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async delete(req: employeeDeleteReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<employeeDeleteReqDto> =
        new ActionReq<employeeDeleteReqDto>();
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

  async deleteBulk(req: Array<employeeDeleteReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<employeeDeleteReqDto>> = new ActionReq<
        Array<employeeDeleteReqDto>
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

  async CreateEmployee(req: employee): Promise<boolean> {
    var result: boolean = false;

    try {
      var postData: ActionReq<employee> = new ActionReq<employee>();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/CreateEmployee',
          postData
        )
      );

      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
  async ImportBulkEmployee(req: Array<employeeSelectReqDto>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<employeeSelectReqDto>> = new ActionReq<
        Array<employeeSelectReqDto>
      >();
      postData.item = req;
      var resp = await firstValueFrom(
        await this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/BulkEmployee',
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
