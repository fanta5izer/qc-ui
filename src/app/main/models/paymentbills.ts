import { Base } from 'src/app/shared/models/base.model';

export class paymentbill {
  id: number = 0;
  paidamount: number = 0;
  billno: string = '';
  billid: number = 0;
  version: number = 0;
  paiddate: Date = Base.GetMinimumDate();
  createdby: number = 0;

  modifiedby: number = 0;

  attributes: AttributesData = {};
  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class AttributesData {}

export class paymentbillSelectReqDto {
  id: number = 0;
}

export class paymentbillSelectResDto extends paymentbill {}

export class paymentbillDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
