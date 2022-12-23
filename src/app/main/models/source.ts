import { Base } from 'src/app/shared/models/base.model';

export class source {
  id: number = 0;
  // importdate: string= "";
  importdate: Date | any = null;
  invoiceid: string = '';
  docref: string = '';
  invoicedate: Date | any = null;
  paymentmode: string = '';
  paymentdate: Date | any = null;
  creditterm: string = '';
  customerid: string = '';
  alternatecustomername: string = '';
  customer: string = '';
  billingaddress: string = '';
  forumcode: string = '';
  goodsvalue: number = 0;
  productdis: number = 0;
  tradedis: number = 0;
  tradedispercentage: string = '';
  addldispercentage: string = '';
  addldis: number = 0;
  freight: number = 0;
  netvalue: number = 0;
  netvolume: number = 0;
  adjref: string = '';
  adjustedamount: number = 0;
  balance: number = 0;
  collectedamount: number = 0;
  branch: string = '';
  beat: string = '';
  salesman: string = '';
  reference: string = '';
  roundoff: string = '';
  documenttype: string = '';
  totaltaxsufferedvalue: number = 0;
  totalsalestaxvalue: number = 0;
  gstinofoutlet: string = '';
  outletstatecode: number = 0;
  tcsrate: number = 0;
  tcsamount: number = 0;
  itemcode: string = '';
  itemname: string = '';
  batch: string = '';
  quantity: number = 0;
  volume: number = 0;
  salesprice: number = 0;
  invoiceuom: string = '';
  invoiceqty: number = 0;
  saletax: string = '';
  taxsuffered: string = '';
  discount: string = '';
  stcredit: number = 0;
  total: number = 0;
  taxsufferedvalue: number = 0;
  hsnnumber: string = '';
  salestaxvalue: number = 0;
  createdby: number = 0;
  createdon: Date = Base.GetMinimumDate();
  isactive: boolean = false;
}

export class sourceSelectReqDto {
  id: number = 0;
}

export class sourceSelectResDto extends source {
  empid: number = 0;
  storeid: number = 0;
  routeid: number = 0;
}

export class sourceDeleteReqDto {
  id: number = 0;
}

// import { basePlacements } from '@popperjs/core';
// import { Base } from 'src/app/shared/models/base.model';

// export class source {
//   id: number = 0;
//   importdate: Date | any = null;
//   beat: string = '';
//   salesman: string = '';
//   customercode: string = '';
//   customername: string = '';
//   documentid: string = '';
//   docreference: string = '';
//   documentdate: Date | any = null;
//   discount: number = 0;
//   discpercentge: number = 0;
//   amount: number = 0;
//   outstanding: number = 0;
//   duedays: number = 0;
//   version: number = 0;
//   createdby: number = 0;
//   createdon: Date = Base.GetMinimumDate();
//   modifiedby: number = 0;
//   modifiedon: Date = Base.GetMinimumDate();
//   attributes: AttributesData = {};

//   isactive: boolean = false;
// }

// export class AttributesData {}

// export class sourceSelectReqDto {
//   id: number = 0;
// }

// export class sourceSelectResDto extends source {
//   customercodevalue: string = '';
//   routename: string = '';
//   empname: string = '';

//   customerid: number = 0;
//   routeid: number = 0;
//   empid: number = 0;
// }

// export class sourceDeleteReqDto {
//   id: number = 0;
//   version: number = 0;
// }
