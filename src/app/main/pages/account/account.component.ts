import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { AuthLogoutReqDto } from '../../models/auth';
import {
  referencelist,
  referencelistSelectReqDto,
  role,
} from '../../models/referencelist';

import { Users } from '../../models/user';
import { ReferencelistService } from '../../services/referencelist.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'main-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    private router: Router,
    private toaster_service: ToastrService,
    private user_service: UserService,
    private authservice: AuthService,
    public validator_service: ValidatorService,
    private referencelist_service: ReferencelistService
  ) {}

  no_of_users: string = '';
  no_of_emp: string = '';
  user: Users = new Users();
  confirm_password: string = '';
  hide_password: boolean = true;
  hide_confirm_password: boolean = true;
  superAdmin: boolean = true;
  role_ref: referencelist[] = [];

  thisUser: Users = new Users();

  ngOnInit(): void {
    this.getData();
  }
  roleList: role[] = [
    { id: 0, name: 'Salesmen' },
    { id: 1, name: 'Cashier' },
    { id: 2, name: 'Accountant' },
    { id: 3, name: 'Admin' },
  ];
  async getData() {
    try {
      var userreq: Users = new Users();
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      userreq.id = this.user.id;

      var getUser = await this.user_service.select(userreq);
      this.user = getUser[0];

      if (this.user.isfactory == true) {
        this.superAdmin = true;
      } else {
        this.superAdmin = false;
      }
    } catch (error) {}
  }

  logout() {
    let logoutDto = new AuthLogoutReqDto();

    logoutDto.refreshtoken = localStorage.getItem('refreshtoken') || '';
    this.authservice.Logout(logoutDto);
  }
  changePassword() {
    this.router.navigate(['home/changepassword'], {});
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

  async save(AccountForm: NgForm) {
    try {
      this.user.attributes = {};
      var resp = await this.user_service.update(this.user);

      this.toaster_service.success('Updated successfully');
    } catch (error) {
      this.toaster_service.error('Update failed');
    }
  }
}
