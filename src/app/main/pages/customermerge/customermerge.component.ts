import { formatCurrency, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { UsersSelectResDto } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ErrorRes } from 'src/app/core/models/erroeresponce';
import { employee, employeeSelectResDto } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';
import * as moment from 'moment';
import { customerSelectResDto } from '../../models/customer';
import { faLess } from '@fortawesome/free-brands-svg-icons';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'main-customermerge',
  templateUrl: './customermerge.component.html',
  styleUrls: ['./customermerge.component.scss'],
})
export class CustomerMergeComponent implements OnInit {
  constructor(
    private router: Router,
    private toaster_service: ToastrService,
    private _location: Location,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService,
    private customer_service: CustomerService,
    private referencelist_service: ReferencelistService
  ) {}

  Category_ref: referencelist[] = [];
  city_ref: referencelist[] = [];
  area_ref: referencelist[] = [];
  district_ref: referencelist[] = [];
  dept_ref: referencelist[] = [];
  state_ref: referencelist[] = [];
  country_ref: referencelist[] = [];
  route_ref: referencelist[] = [];

  customer: customerSelectResDto = new customerSelectResDto();

  isEdit: boolean = false;
  support_credit: boolean = false;

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.isEdit = true;
        this.getCustomer(parseInt(params['id']));
      }
    });

    this.getCategory();
    this.getCity();
    this.getArea();
    this.getDistrict();
    this.getState();
    this.getCountry();
    this.getRoute();
  }
  async getCategory() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'CATEGORY';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.Category_ref = res;
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
      }
    } catch (error) {}
  }
  async getArea() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'AREA';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.area_ref = res;
      }
    } catch (error) {}
  }
  async getDistrict() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'DISTRICT';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.district_ref = res;
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
  async getState() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'STATE';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.state_ref = res;
      }
    } catch (error) {}
  }
  async getCountry() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'COUNTRY';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.country_ref = res;
      }
    } catch (error) {}
  }

  async getCustomer(id: number) {
    try {
      var req = new customerSelectResDto();
      req.id = id;
      var resp = await this.customer_service.select(req);
      if (resp.length) {
        this.customer = resp[0];
        this.support_credit = this.customer.supportcredit;
      }
    } catch (error) {}
  }

  async onSave(CustomerMergeForm: NgForm) {
    try {
      if (CustomerMergeForm.valid) {
        this.customer.supportcredit = this.support_credit;

        if (this.customer.id > 0) {
          var resp = await this.customer_service.update(this.customer);
          this.toaster_service.success(
            this.translate.instant('CUSTOMERMERGE.UPDATE_SUCCESS')
          );
        } else {
          var res = await this.customer_service.insert(this.customer);
          this.toaster_service.success(
            this.translate.instant('CUSTOMERMERGE.SAVE_SUCCESS')
          );
        }
      }

      this.router.navigate(['home/customer'], {});
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
    this.router.navigate(['home/customer'], {});
  }
}
