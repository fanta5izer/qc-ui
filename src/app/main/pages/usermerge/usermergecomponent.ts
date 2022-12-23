import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDropdownPanelComponent } from '@ng-select/ng-select/lib/ng-dropdown-panel.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { Users } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorRes } from 'src/app/core/models/erroeresponce';
import { AlertPopupComponent } from '../../components/alert-popup/alert-popup.component';

@Component({
  selector: 'main-usermerge',
  templateUrl: './usermerge.component.html',
  styleUrls: ['./usermerge.component.scss'],
})
export class UserMergeComponent implements OnInit {
  @ViewChild('roleMergeForm', { static: false }) form: NgForm;

  constructor(
    private router: Router,
    private user_service: UserService,
    private toaster_service: ToastrService,
    private _location: Location,
    private _route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService,
    public modalService: NgbModal
  ) {}
  is_edit: boolean = false;
  is_save: boolean = false;

  user: Users = new Users();
  confirm_password: string = '';
  hide_password: boolean = true;
  hide_confirm_password: boolean = true;
  superadmin: boolean = false;
  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.is_edit = true;
        this.getUsers(parseInt(params['id']));
      }
    });
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

  async getUsers(id: number) {
    try {
      var req = new Users();
      req.id = id;
      var resp = await this.user_service.select(req);

      if (resp.length > 0) {
        this.user = resp[0];
        // this.user.email = this.user.email.toLowerCase();
        this.user.password = '';
        this.confirm_password = this.user.password;

        if (this.user.role == 'SUPERADMIN') {
          this.superadmin = true;
        }
      }
    } catch (error) {}
  }

  async onSaveuser(userMergeForm: Form) {
    if (this.user.password != this.confirm_password) {
      this.toaster_service.error('Password mismatch');
    }
    try {
      if (this.user.id > 0 && this.user.password == this.confirm_password) {
        this.user.email = this.user.email.toLowerCase();
        var resp = await this.user_service.update(this.user);
        this.toaster_service.success(
          this.translate.instant('USERMERGE.UPDATE_SUCCESS')
        );
      } else {
        this.user.email = this.user.email.toLowerCase();

        var resp = await this.user_service.insert(this.user);
        this.toaster_service.success(
          this.translate.instant('USERMERGE.SAVE_SUCCESS')
        );
      }
      this.is_save = true;

      this.router.navigate(['home/user'], {});
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

      // this.toaster_service.error(
      //   this.translate.instant('USERMERGE.SAVE_FAILURE')
      // );
    }
  }

  async onClickCancel(userMergeForm: NgForm) {
    if (!this.is_save && userMergeForm.dirty) {
      const modalRef = this.modalService.open(AlertPopupComponent);

      await modalRef.result
        .then((result) => {
          if (result == true) {
            this.router.navigate(['home/user']);
          }
        })
        .catch((error) => {});
    } else {
      this.router.navigate(['home/user']);
    }
    this.is_save = false;
  }
}
