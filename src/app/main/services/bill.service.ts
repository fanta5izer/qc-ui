import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { paymentAndPaymentBillUpdateReqDto } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/bill';
  }

  async payBill(req: paymentAndPaymentBillUpdateReqDto): Promise<boolean> {
    var result: boolean = false;
    try {
      var postData: ActionReq<paymentAndPaymentBillUpdateReqDto> =
        new ActionReq<paymentAndPaymentBillUpdateReqDto>();
      postData.item = req;
      var resp = await firstValueFrom(
        this.http.post<ActionRes<boolean>>(this._baseUrl + '/payBill', postData)
      );
      if (resp.item) result = resp.item;
    } catch (error) {
      throw error;
    }
    return result;
  }
}
