import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { UsersSelectResDto } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ErrorRes } from 'src/app/core/models/erroeresponce';
import {
  employee,
  employeeSelectResDto,
  employeeUpdateReqDto,
} from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {
  referencelist,
  referencelistSelectReqDto,
  role,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';
import * as moment from 'moment';
import { EmpPlanService } from '../../services/empplan.service';
import {
  AttributesData,
  empplan,
  empplanSelectReqDto,
} from '../../models/empplan';

@Component({
  selector: 'main-employeemerge',
  templateUrl: './employeemerge.component.html',
  styleUrls: ['./employeemerge.component.scss'],
})
export class EmployeeMergeComponent implements OnInit {
  constructor(
    private router: Router,
    private toaster_service: ToastrService,
    private _location: Location,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService,
    private user_service: UserService,
    private employee_service: EmployeeService,
    private referencelist_service: ReferencelistService,
    private empplan_service: EmpPlanService
  ) {}
  empplan: empplan = new empplan();
  empplanAttributes: AttributesData[] = [];
  role_ref: referencelist[] = [];
  day_ref: referencelist[] = [];
  city_ref: referencelist[] = [];
  productgrp_ref: referencelist[] = [];
  dept_ref: referencelist[] = [];
  route_ref: referencelist[] = [];
  route_ref_plan: referencelist[] = [];
  employee: employeeSelectResDto = new employeeSelectResDto();
  users: UsersSelectResDto = new UsersSelectResDto();

  isEdit: boolean = false;
  hide_password: boolean = true;
  hide_confirm_password: boolean = true;
  confirm_password: string = '';

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.isEdit = true;
        this.getEmployee(parseInt(params['id']));
        this.getEmpplan(parseInt(params['id']));
      }
    });
    this.getRoute();

    this.getDays();
    this.getCity();
    this.getDept();
    this.getProductgrp();
  }
  DayList = [
    {
      id: 0,
      type: 'DAY',
      code: 'SUNDAY',
      value: 'sunday',
    },
    {
      id: 1,
      type: 'DAY',
      code: 'MONDAY',
      value: 'monday',
    },
    {
      id: 2,
      type: 'DAY',
      code: 'TUESDAY',
      value: 'tuesday',
    },
    {
      id: 3,
      type: 'DAY',
      code: 'WEDNESDAY',
      value: 'wednesday',
    },
    {
      id: 4,
      type: 'DAY',
      code: 'THURSDAY',
      value: 'thursday',
    },
    {
      id: 5,
      type: 'DAY',
      code: 'FRIDAY',
      value: 'friday',
      name: 'friday',
    },
    {
      id: 16,
      type: 'DAY',
      code: 'SATURDAY',
      value: 'saturday',
    },
  ];
  roleList: role[] = [
    { id: 0, name: 'Salesmen' },
    { id: 1, name: 'Cashier' },
    { id: 2, name: 'Accountant' },
    { id: 3, name: 'Admin' },
  ];
  async getDays() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'DAY';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.day_ref = res;
      }
    } catch (error) {}
  }
  async getDept() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'DEPARTMENT';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.dept_ref = res;
      }
    } catch (error) {}
  }
  async getProductgrp() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'PRODUCTGROUP';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.productgrp_ref = res;
      }
    } catch (error) {}
  }
  async getCity() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'CITY';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.city_ref = res;
      }
    } catch (error) {}
  }
  async getRoute() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'ROUTE';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.route_ref = res;
        this.route_ref_plan = res;
      }
    } catch (error) {}
  }

  async getEmployee(id: number) {
    try {
      var req = new employeeSelectResDto();
      req.id = id;
      var resp = await this.employee_service.select(req);
      if (resp.length > 0) {
        this.employee = resp[0];
        this.employee.dateofbirth = moment(this.employee.dateofbirth).format(
          'yyyy-MM-DD'
        );
        this.employee.dateofjoining = moment(
          this.employee.dateofjoining
        ).format('yyyy-MM-DD');
      }
    } catch (error) {}
  }
  async getEmpplan(id: number) {
    try {
      var req: empplanSelectReqDto = new empplanSelectReqDto();
      req.employeeid = id;
      var resp = await this.empplan_service.select(req);
      if (resp) {
        this.empplan = resp[0];
        this.empplanAttributes = resp[0].attributes;
      }
    } catch (error) {}
  }

  async onSaveEmployee(employeeMergeForm: NgForm) {
    try {
      if (employeeMergeForm.valid) {
        if (this.employee.id > 0) {
          this.employee.password = '';

          var req: employeeUpdateReqDto = new employeeUpdateReqDto();
          req.emp = this.employee;

          this.empplan.attributes = this.empplanAttributes;
          req.empplan = this.empplan;

          // this.employee.empplanid = this.empplan.id;
          // this.employee.attributes = this.empplanAttributes;
          // this.employee.empplanversion = this.empplan.version;

          var resp = await this.employee_service.updateAll(req);

          this.toaster_service.success(
            this.translate.instant('EMPLOYEEMERGE.UPDATE_SUCCESS')
          );
        } else {
          var res = await this.employee_service.CreateEmployee(this.employee);
          this.toaster_service.success(
            this.translate.instant('EMPLOYEEMERGE.SAVE_SUCCESS')
          );
        }
      }

      this.router.navigate(['home/employee'], {});
    } catch (error: any) {
      var error_msg =
        error && error.error && error.error.message ? error.error.message : '';
      if (error_msg == ErrorRes.EMAILALREADYTAKEN) {
        this.toaster_service.error(
          error_msg.length > 0 ? 'Email already taken' : 'error_msg'
        );
      } else {
        this.toaster_service.error(
          error_msg.length > 0 ? error_msg : 'Error Message'
        );
      }
      // this.toaster_service.success(
      //   this.translate.instant('CONTACTMERGE.SAVE_FAILURE')
      // );
    }
  }

  onClickCancel() {
    this.router.navigate(['home/employee'], {});
  }

  showPassword(mouseEvent: any) {
    if (mouseEvent) {
      this.hide_password = false;
    } else {
      this.hide_password = true;
    }
  }

  showConfirmPassword(mouseEvent: any) {
    if (mouseEvent) {
      this.hide_confirm_password = false;
    } else {
      this.hide_confirm_password = true;
    }
  }
}
