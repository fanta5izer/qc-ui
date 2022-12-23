import { Base } from 'src/app/shared/models/base.model';

export class empplan {
  id: number = 0;
  employeeid: number = 0;
  routeid: number = 0;
  version: number = 0;
  createdby: number = 0;
  modifiedby: number = 0;
  attributes: AttributesData[] = [];
  isactive: boolean = false;

  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class AttributesData {
  routeidList: number[] = [];
  productgrpidList: number[] = [];
  dayid: number = 0;
}

export class empplanSelectReqDto {
  id: number = 0;
  employeeid: number = 0;
}

export class empplanSelectResDto extends empplan {
  empname: string;
}

export class empplanDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
