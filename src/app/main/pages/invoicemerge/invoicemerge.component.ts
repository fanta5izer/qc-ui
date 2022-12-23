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
import {
  employee,
  employeeSelectReqDto,
  employeeSelectResDto,
} from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';
import * as moment from 'moment';
import {
  customerSelectReqDto,
  customerSelectResDto,
} from '../../models/customer';
import { faLess } from '@fortawesome/free-brands-svg-icons';
import { CustomerService } from '../../services/customer.service';
import { InvoiceService } from '../../services/invoice.service';
import { bill, billSelectResDto } from '../../models/bill';

@Component({
  selector: 'main-invoicemerge',
  templateUrl: './invoicemerge.component.html',
  styleUrls: ['./invoicemerge.component.scss'],
})
export class InvoiceMergeComponent implements OnInit {
  constructor(
    private router: Router,
    private toaster_service: ToastrService,
    private _location: Location,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService,
    private invoice_service: InvoiceService,
    private referencelist_service: ReferencelistService,
    private customer_service: CustomerService,
    private employee_service: EmployeeService
  ) {}

  route_ref: referencelist[] = [];
  area_ref: referencelist[] = [];
  productgrp_ref: referencelist[] = [];
  dept_ref: referencelist[] = [];
  state_ref: referencelist[] = [];
  country_ref: referencelist[] = [];

  invoice: billSelectResDto = new billSelectResDto();
  customer_list: customerSelectResDto[] = [];
  salesman_list: employeeSelectReqDto[] = [];

  isEdit: boolean = false;
  support_credit: boolean = false;

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.isEdit = true;
        this.getInvoice(parseInt(params['id']));
      }
    });

    this.getRoute();
    this.getArea();
    this.getProductgrp();

    this.getCustomer();
    this.getSalesman();
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

  async getCustomer() {
    try {
      var req: customerSelectReqDto = new customerSelectReqDto();
      var res: customerSelectResDto[] = [];
      res = await this.customer_service.select(req);
      if (res) {
        this.customer_list = res;
      }
    } catch (error) {}
  }

  async getSalesman() {
    try {
      var req: employeeSelectReqDto = new employeeSelectReqDto();
      var res: employeeSelectResDto[] = [];
      res = await this.employee_service.select(req);
      if (res) {
        this.salesman_list = res;
      }
    } catch (error) {}
  }

  async getInvoice(id: number) {
    try {
      var req = new customerSelectResDto();
      req.id = id;
      var resp = await this.invoice_service.select(req);
      if (resp.length) {
        this.invoice = resp[0];
      }
    } catch (error) {}
  }

  async onSave(invoiceMergeForm: NgForm) {
    try {
      if (invoiceMergeForm.valid) {
        if (this.invoice.id > 0) {
          var req: bill = new bill();
          req = this.invoice;
          req.billattributes = {};
          var resp = await this.invoice_service.update(req);
          this.toaster_service.success(
            this.translate.instant('INVOICEMERGE.UPDATE_SUCCESS')
          );
        } else {
          var req: bill = new bill();
          req = this.invoice;
          req.billattributes = {};

          var res = await this.invoice_service.insert(req);
          this.toaster_service.success(
            this.translate.instant('INVOICEMERGE.SAVE_SUCCESS')
          );
        }
      }

      this.router.navigate(['home/invoice'], {});
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
