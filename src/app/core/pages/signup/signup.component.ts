import { NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { Auth } from 'src/app/main/models/auth';
import { Users } from 'src/app/main/models/user';
import { SampleService } from 'src/app/shared/service/sample.service';
import { ValidatorService } from 'src/app/shared/service/validator/validator.service';
import { ErrorRes } from '../../models/erroeresponce';

@Component({
  selector: 'main-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit {
  TAG = 'LoginComponent';
  // loginForm  : FormGroup;
  // signUpForm = new FormGroup({
  //   username: new FormControl('name'),
  //   companyname: new FormControl('Company name'),
  //   email: new FormControl('email'),
  //   password: new FormControl('password'),
  //   mobile: new FormControl('Mobile'),
  // });

  confirm_password: string = '';
  company_name: string = '';
  hide_password: boolean = true;
  hide_confirm_password: boolean = true;
  loading = false;
  submitted = false;

  user: Users = new Users();
  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService,

    private _sampleService: SampleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public validator_service: ValidatorService
  ) {}

  ngOnInit() {
    // this.signUpForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   mobile: ['', Validators.required],
    //   companyname: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    // this.getData();
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

  async onSubmit(signup: NgForm) {
    try {
      if (signup.valid) {
        this.submitted = true;
        this.loading = true;
        var req: Auth = new Auth();

        req.username = this.user.firstname;
        // req.companyname = this.company_name;
        req.email = this.user.email.toLowerCase();
        req.password = this.user.password;
        req.mobile = this.user.mobile;
        var resp = await this._authService.SignUp(req);
        if (resp != null) {
          this.loading = false;
          this._toastrService.success('Registration Sucessfully Completed');
          this.router.navigate(['login'], {});
        }
      }
    } catch (error: any) {
      this.loading = false;

      var error_msg =
        error && error.error && error.error.message ? error.error.message : '';
      if (error_msg == ErrorRes.EMAILALREADYTAKEN) {
        this._toastrService.error(
          error_msg.length > 0 ? 'Email already taken' : 'error_msg'
        );
      } else {
        this._toastrService.error(
          error_msg.length > 0 ? error_msg : 'Error Message'
        );
      }

      this._toastrService.error(
        error_msg.length > 0 ? error_msg : 'Error Message'
      );
      throw error;
    }
    // if (this.loginForm.invalid) {
    //   var u = this.f.email.value;
    //   var p = this.f.password.value;
    //   var cp = this.f.confirmpassword.value;
    //   if (u == '') {
    //     this._toastrService.info('Enter Email');
    //   } else if (p == '') {
    //     this._toastrService.info('Enter Password');
    //   }
    //   return;
    // }

    //   try {
    //     var username = this.f.username.value || '';
    //     var company = this.f.companyname.value || '';
    //     var email = this.f.email.value || '';
    //     var password = this.f.password.value || '';
    //     var mobile = this.f.mobile.value || '';
    //     var req: Auth = new Auth();
    //     req.username = username;
    //     req.companyname = company;
    //     req.email = email;
    //     req.password = password;
    //     req.mobile = mobile;
    //     console.log('req', req);
    //     var resp = await this._authService.SignUp(req);
    //     if (resp != null || resp != undefined) {
    //       this._toastrService.error('E mail Already Taken');
    //     } else {
    //       this.router.navigate(['login'], {});
    //       this.signUpForm.reset();
    //     }
    //   } catch (error) {
    //     throw error;
    //   }

    // }
  }
}
