import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorRes } from 'src/app/core/models/erroeresponce';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { AuthLoginReqDto, AuthLoginResDto } from '../../../main/models/auth';

@Component({
  selector: 'main-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  TAG = 'LoginComponent';

  submitted = false;
  loading = false;
  hide_password: boolean = true;
  login: AuthLoginReqDto = new AuthLoginReqDto();
  constructor(
    private _toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    public validator_service: ValidatorService
  ) {}

  ngOnInit() {}

  showPassword(mouseEvent: any) {
    if (mouseEvent) {
      this.hide_password = false;
    } else {
      this.hide_password = true;
    }
  }

  //
  goToForgot() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route });
  }

  async onSubmit(loginform: NgForm) {
    try {
      if (loginform.valid) {
        this.submitted = true;
        this.loading = true;
        var req: AuthLoginReqDto = new AuthLoginReqDto();
        req.email = this.login.email.toLowerCase();
        req.password = this.login.password;
        var res: AuthLoginResDto = await this._authService.Login(req);
        if (res != null) {
          this.loading = false;

          localStorage.setItem('accesstoken', res.accesstoken);
          localStorage.setItem('refreshtoken', res.refreshtoken);
          localStorage.setItem('user', JSON.stringify(res.user));
          // localStorage.setItem('orgid', res.user.orgid.toString());
        }
      }
    } catch (error: any) {
      this.loading = false;
      var error_msg =
        error && error.error && error.error.message ? error.error.message : '';
      if (error_msg == ErrorRes.INVALIDUSER) {
        this._toastrService.error(
          error_msg.length > 0 ? 'Invalid user' : 'error_msg'
        );
      }
      if (error_msg == ErrorRes.INVALIDUSERCREDENTIAL) {
        this._toastrService.error(
          error_msg.length > 0 ? 'Invalid password' : 'error_msg'
        );
      }

      throw error;
    }

    this.router.navigate(['home/referencelist'], {});
  }
}
