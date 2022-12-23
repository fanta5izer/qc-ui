import { Base } from 'src/app/shared/models/base.model';

export class referencelist {
  id: number = 0;
  type: string = '';
  code: string = '';
  name: string = '';
  value: string = '';
  additionalinfo: AdditionalinfoData = {};
  sortingindex: number = 0;
  version: number = 0;
  createdby: number = 0;

  modifiedby: number = 0;

  isactive: boolean = false;
  createdon: Date = Base.GetMinimumDate();
  modifiedon: Date = Base.GetMinimumDate();
}

export class AdditionalinfoData {}

export class referencelistSelectReqDto {
  id: number = 0;
  type: string = '';
}

export class referencelistSelectResDto extends referencelist {}

export class referencelistDeleteReqDto {
  id: number = 0;
  version: number = 0;
}

export class role {
  id: number = 0;
  name: string = '';
}
