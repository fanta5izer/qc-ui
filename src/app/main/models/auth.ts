import { Users } from './user';

export class Auth {
  id: number = 0;
  username: string = '';
  companyname: string = '';
  email: string = '';
  password: string = '';
  mobile: string = '';
  version: number = 0;
  createdby: number = 0;
  createdon: Date = new Date();
  modifiedby: number = 0;
  modifiedon: Date = new Date();
  isactive: boolean = true;
  issuspended: boolean = false;
  parentid: number = 0;
  isfactory: boolean = false;
  attributes: AttributesData = {};

  notes: string = '';
}

export class AttributesData {}

export class AuthSelectReqDto {
  id: number = 0;
}

export class AuthSelectResDto extends Auth {}

export class AuthDeleteReqDto {
  id: number = 0;
  version: number = 0;
}

export class AuthSignupReqDto {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
}

export class AuthLoginReqDto {
  email: string = '';
  password: string = '';
}
export class AuthLoginResDto {
  accesstoken: string = '';
  refreshtoken: string = '';
  user: Users = new Users();
}
export class AuthLogoutReqDto {
  refreshtoken: string = '';
}
