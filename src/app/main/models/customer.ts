import { Base } from 'src/app/shared/models/base.model';

export class customer {
  id: number = 0;
  code: string = '';
  name: string = '';
  billingname: string = '';
  customertype: number = 0;
  mobileno: string = '';
  areaid: number = 0;
  supportcredit: boolean = false;
  creditlimit: number = 0;
  creditdays: number = 0;
  countryid: number = 0;
  districtid: number = 0;
  bankifsc: string = '';
  bankaccountno: string = '';
  bankaccountname: string = '';
  bankname: string = '';
  isinterstatesale: boolean = false;
  cityid: number = 0;
  city: string = '';
  route: string = '';
  routeid: number = 0;
  emailid: string = '';
  address: string = '';
  categoryid: number = 0;
  gstno: string = '';
  contactperson: string = '';
  state: string = '';
  stateid: number = 0;
  pincode: string = '';
  version: number = 0;
  createdby: number = 0;
  modifiedby: number = 0;
  attributes: AttributesData = {};
  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class AttributesData {}

export class customerSelectReqDto {
  id: number = 0;
}

export class customerSelectResDto extends customer {
  categoryname: string = '';
  areaname: string = '';
  cityname: string = '';
  districtname: string = '';
  statename: string = '';
  countryname: string = '';
  routename: string = '';
}

export class customerDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
