import { Base } from 'src/app/shared/models/base.model';

export class bill {
  id: number = 0;
  customerid: number = 0;
  receivable: number = 0;
  discountpercentage: number = 0;
  discount: number = 0;
  tax: number = 0;
  billdate: Date = Base.GetMinimumDate();
  billno: string = '';
  routeid: number = 0;
  areaid: number = 0;
  productgroupid: number = 0;
  salesmanid: number = 0;
  billattributes: BillattributesData = {};
  isinterstatetransfer: boolean = false;
  rounding: number = 0;
  settled: boolean = false;
  qty: boolean = false;
  iscancel: boolean = false;
  billref: string = '';
  amount: number = 0;
  duedays: number = 0;
  version: number = 0;
  createdby: number = 0;
  createdon: Date = Base.GetMinimumDate();
  modifiedby: number = 0;
  modifiedon: Date = Base.GetMinimumDate();
  isactive: boolean = false;

  // temp solution
  duedate: number = 0;
  collectedamount: number = 0;
}

export class BillattributesData {}

export class billSelectReqDto {
  id: number = 0;
  // customerid: number = 0;
}

export class billSelectResDto extends bill {
  empname: string = '';
  customername: string = '';
  routename: string = '';
  // ui
  // receivable: number = 0;
  // invoicecollectedamount: number = 0;
  // settled: boolean = false;
}

export class billDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
