import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import {
  ChangepwdReq,
  Users,
  UsersSelectReqDto,
  UsersSelectResDto,
} from '../../models/user';
import { UserService } from '../../services/user.service';
import { ErrorRes } from 'src/app/core/models/erroeresponce';
import { Router } from '@angular/router';

@Component({
  selector: 'main-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  constructor(
    public validator_service: ValidatorService,
    private user_service: UserService,
    private toastr_service: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  user: UsersSelectResDto = new UsersSelectResDto();

  changePwd: ChangepwdReq = new ChangepwdReq();
  confirm_password: string = '';
  hide_password: boolean = true;
  hide_confirm_password: boolean = true;
  change_password: string = '';
  check_password: boolean = false;
  hide_old_password: boolean = true;
  Password: string = '';
  newpassword: string = '';

  async getData() {
    var req: Users = new Users();

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    req.id = this.user.id;
  }

  showOldPassword(mouseEvent: any) {
    if (mouseEvent) {
      this.hide_old_password = false;
    } else {
      this.hide_old_password = true;
    }
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

  async save(resetPasswordForm: NgForm) {
    try {
      if (this.newpassword == this.confirm_password) {
        // this.user.password = this.Password;
        // this.user.newpassword = this.newpassword;
        // this.user.rolename = '';
        // this.user.attributes = [];

        this.changePwd.newpassword = this.newpassword;
        this.changePwd.oldpassword = this.Password;
        this.changePwd.userid = this.user.id;
        var resp = await this.user_service.resetPassword(this.changePwd);

        this.Password = '';
        this.newpassword = '';
        this.confirm_password = '';
        this.toastr_service.success('Password changed successfully');

        this.router.navigate(['home/dashboard'], {});
      }
    } catch (error: any) {
      var error_msg =
        error && error.error && error.error.message ? error.error.message : '';
      if (error_msg == ErrorRes.INVALIDUSER) {
        this.toastr_service.error(
          error_msg.length > 0 ? 'Invalid user' : 'error_msg'
        );
      }
      if (error_msg == ErrorRes.INVALIDUSERCREDENTIAL) {
        this.toastr_service.error(
          error_msg.length > 0 ? 'Invalid Password' : 'error_msg'
        );
      }
    }
  }

  // async save(resetPasswordForm: NgForm) {
  //   if (this.user.id > 0) {
  //     this.user.password = this.Password;
  //     var resp = await this.user_service.update(this.user);
  //     this.toaster_service.success(
  //       this.translate.instant('LEADMERGE.UPDATE_SUCCESS')
  //     );
  //       this.check_password = false
  //   }
  //   this.getData();
  // }
}
