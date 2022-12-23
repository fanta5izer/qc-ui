import { Base } from './base.model';

export class Sample {
  id: number = 0;
  version: number = 0;
  created_by: number = 0;
  created_on: Date = Base.GetMinimumDate();
  modified_by: number = 0;
  modified_on: Date = Base.GetMinimumDate();
  attributes: Sample.AttributesData | null = null;
  is_active: boolean = false;
  is_suspended: boolean = false;
  parent_id: number = 0;
  is_factory: boolean = false;
  notes: string = '';
}

export namespace Sample {
  export class AttributesData {}
}

export class SampleSelectReqDto {
  id: number = 0;
}

export class SampleSelectResDto extends Sample {}

export class SampleDeleteReqDto {
  id: number = 0;
  version: number = 0;
}
