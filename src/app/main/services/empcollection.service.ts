import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { billSelectReqDto } from '../models/bill';
import {
  empcollectionSelectReqDto,
  empcollectionSelectResDto,
} from '../models/empcollection';

@Injectable({
  providedIn: 'root',
})
export class EmpcollectionService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/empcollection';
  }
  async GetEmployeeCollections(
    req: empcollectionSelectReqDto
  ): Promise<Array<empcollectionSelectResDto>> {
    var result: Array<empcollectionSelectResDto> = [];
    try {
      var postData: ActionReq<billSelectReqDto> =
        new ActionReq<billSelectReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<Array<empcollectionSelectResDto>>>(
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
}
