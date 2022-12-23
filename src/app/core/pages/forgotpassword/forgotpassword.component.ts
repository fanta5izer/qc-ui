import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'main-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  TAG = 'LoginComponent';
  // loginForm  : FormGroup;
  loginForm = new FormGroup({
    username: new FormControl('first name'),
    password: new FormControl('last name'),
  });

  loading = false;
  submitted = false;
  constructor(
    private _toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      var u = this.f.username.value;
      var p = this.f.password.value;
      if (u == '') {
        this._toastrService.info('Enter username');
      } else if (p == '') {
        this._toastrService.info('Enter password');
      }

      return;
    }
    this.loading = true;
    var login = this.f.username.value;
    var password = this.f.password.value;
    this.loading = false;
  }
}
