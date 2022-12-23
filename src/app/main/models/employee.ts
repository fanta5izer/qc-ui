import { Base } from 'src/app/shared/models/base.model';
import { AttributesData, empplan } from './empplan';

export class employee {
  id: number = 0;
  code: string = '';
  name: string = '';
  mobileno: string = '';
  emailid: string = '';
  address: string = '';
  loginusername: string = '';
  cityid: number = 0;
  hasleft: boolean = false;
  departmentid: number = 0;
  dateofbirth: Date | any = Base.GetMinimumDate();
  resignationdate: Date | any = Base.GetMinimumDate();
  roleid: number = 0;
  dateofjoining: Date | any = Base.GetMinimumDate();
  relievingdate: Date | any = Base.GetMinimumDate();
  routeid: number = 0;
  productgroupid: number = 0;
  version: number = 0;
  createdby: number = 0;

  modifiedby: number = 0;

  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class employeeSelectReqDto {
  id: number = 0;
}

export class employeeSelectResDto extends employee {
  password: string = '';
  routename: string = '';
  deptname: string = '';
  rolename: string = '';
  cityname: string = '';
  productgrpname: string = '';
  // empplanid: number = 0;
  // attributes: AttributesData[] = [];
  // empplanversion: number = 0;
}

export class employeeDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
export class employeeUpdateReqDto {
  emp: employeeSelectResDto = new employeeSelectResDto();
  empplan: empplan = new empplan();
}
