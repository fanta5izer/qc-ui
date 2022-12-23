import { Base } from 'src/app/shared/models/base.model';

export class Users {
  id: number = 0;
  roleid: number = 0;
  firstname: string = '';
  lastname: string = '';
  role: string = '';
  username: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  version: number = 0;
  createdby: number = 0;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
  modifiedby: number = 0;
  attributes: AttributesData = {};
  isactive: boolean = false;
  issuspended: boolean = false;
  parentid: number = 0;
  isfactory: boolean = false;
  notes: string = '';
}

export class AttributesData {}

export class UsersSelectReqDto {
  id: number = 0;
  email: string = '';
}

export class UsersSelectResDto extends Users {
  rolename: string = '';
}
export class ChangepwdReq {
  newpassword: string = '';
  oldpassword: string = '';
  userid: number = 0;
}
export class UsersDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
