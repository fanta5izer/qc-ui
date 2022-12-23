import { formatCurrency, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { UserService } from '../../services/user.service';
import { ReferencelistService } from '../../services/referencelist.service';
import {
  referencelist,
  referencelistSelectResDto,
} from '../../models/referencelist';
import { param } from 'jquery';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'main-refrencelistmerge',
  templateUrl: './referencelistmerge.component.html',
  styleUrls: ['./referencelistmerge.component.scss'],
})
export class ReferencelistMergeComponent implements OnInit {
  constructor(
    private referencelist_service: ReferencelistService,
    private router: Router,
    private toaster_service: ToastrService,
    private _location: Location,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService,
    private user_service: UserService
  ) {
    this.referencelist.type = this.type;
  }

  referencelist: referencelist = new referencelist();
  type: string = '';

  refrencetype_list: Array<{ id: number; displaytext: string }> = [
    { id: 1, displaytext: 'ROUTE' },
    { id: 2, displaytext: 'ROLE' },
    { id: 3, displaytext: 'DEPARTMENT' },
    { id: 4, displaytext: 'PRODUCTGROUP' },
    { id: 5, displaytext: 'CITY' },
    { id: 6, displaytext: 'DISTRICT' },
    { id: 7, displaytext: 'AREA' },
    { id: 8, displaytext: 'COUNTRY' },
    { id: 9, displaytext: 'CATEGORY' },
    { id: 10, displaytext: 'DAY' },
    { id: 11, displaytext: 'STATE' },
    { id: 12, displaytext: 'PAYMENTMODE' },
  ];

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      var data = params;
      if (params['type']) {
        this.referencelist.type = params['type'];
      }
      if (params['id']) {
        this.getReferencelistbyId(parseInt(params['id']));
      }
    });
  }

  async getReferencelistbyId(id: number) {
    try {
      var req = new referencelistSelectResDto();
      req.id = id;
      var resp = await this.referencelist_service.select(req);
      if (resp.length > 0) {
        this.referencelist = resp[0];
      }
    } catch (error) {}
  }

  onNameChange() {
    this.referencelist.code = this.referencelist.value
      .split(' ')
      .join('_')
      .toUpperCase();
  }
  async onSaveReferencelist(referencelistMergeForm: NgForm) {
    try {
      if (referencelistMergeForm.valid) {
        if (this.referencelist.id > 0) {
          var resp = await this.referencelist_service.update(
            this.referencelist
          );

          this.toaster_service.success(
            this.translate.instant('REFERENCELISTMERGE.UPDATE_SUCCESS')
          );
        } else {
          this.referencelist.isactive = true;
          this.referencelist.name = this.referencelist.value;
          var resp = await this.referencelist_service.insert(
            this.referencelist
          );
          this.toaster_service.success(
            this.translate.instant('REFERENCELISTMERGE.SAVE_SUCCESS')
          );
          // referencelistMergeForm.resetForm();
        }
      }

      // this._location.back();
    } catch (error: any) {
      var error_msg =
        error && error.error && error.error.message ? error.error.message : '';
      this.toaster_service.error(
        error_msg.length > 0 ? error_msg : 'error_msg'
      );
      // this.toaster_service.success(
      //   this.translate.instant('CONTACTMERGE.SAVE_FAILURE')
      // );
    }
  }

  onClickCancel() {
    this.router.navigate(['home/referencelist'], {});
  }
}
