import { Base } from 'src/app/shared/models/base.model';

export class empcollection {
  id: number = 0;
  amount: number = 0;
  paymentinfo: PaymentinfoData = {};
  paidon: Date = Base.GetMinimumDate();
  customerid: number = 0;
  remark: string = '';
  receivedby: number = 0;
  version: number = 0;
  createdby: number = 0;

  modifiedby: number = 0;

  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
  routeid: number = 0;
}

export class PaymentinfoData {}

export class empcollectionSelectReqDto {
  id: number = 0;
  paidon: Date | any = null;
  settled: boolean = false;
}

export class empcollectionSelectResDto extends empcollection {
  customername: string = '';
  salesmanname: string = '';
  routename: string = '';
}

export class empcollectionDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
