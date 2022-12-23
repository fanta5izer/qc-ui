import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { paymentbill } from '../models/paymentbills';

@Injectable({
  providedIn: 'root',
})
export class PaymentBillService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/paymentbill';
  }
  async insertBulk(req: Array<paymentbill>): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<Array<paymentbill>> = new ActionReq<
        Array<paymentbill>
      >();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(
          this._baseUrl + '/insertbulk',
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
