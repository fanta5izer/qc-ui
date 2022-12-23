import { Base } from 'src/app/shared/models/base.model';

export class ApplicationFiles extends Base {
  orgid: number = 0;
  id: number = 0;
  name: string = '';
  type: string = '';
  source: string = '';
  version: number = 0;
  createdby: number = 0;
  createdon: Date = Base.GetMinimumDate();
  modifiedby: number = 0;
  modifiedon: Date = Base.GetMinimumDate();
  attributes: AttributesData = new AttributesData();
  isactive: boolean = false;
  issuspended: boolean = false;
  parent_id: number = 0;
  isfactory: boolean = false;
  notes: string = '';
}

export class AttributesData {}

export class ApplicationFilesSelectReqDto {
  id: number = 0;
}

export class ApplicationFilesSelectResDto extends ApplicationFiles {}

export class ApplicationFilesDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
