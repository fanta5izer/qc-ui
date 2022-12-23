import { Base } from 'src/app/shared/models/base.model';
import { paymentbill } from './paymentbills';

export class payment {
  id: number = 0;
  paymentinfo: PaymentinfoData = {};
  receiptno: string = '';
  amount: number = 0;
  receivedby: number = 0;
  paidon: Date = Base.GetMinimumDate();
  customerid: number = 0;
  tdspercentage: number = 0;
  tdsamount: number = 0;
  rounding: number = 0;
  collectedat: number = 0;
  discount: number = 0;
  hastds: boolean = false;
  version: number = 0;
  createdby: number = 0;

  modifiedby: number = 0;

  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class PaymentinfoData {}

export class paymentSelectReqDto {
  id: number = 0;
}

export class paymentSelectResDto extends payment {}

export class paymentDeleteReqDto {
  id: number = 0;
  version: number = 0;
}

export class paymentAndPaymentBillUpdateReqDto {
  payment: payment = new payment();
  paymentbill: Array<paymentbill> = new Array<paymentbill>();
}
