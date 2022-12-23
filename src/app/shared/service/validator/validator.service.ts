import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl } from '@angular/forms';
import { result, upperCase } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}
  formEmail: ValidatorFn | any = (c: FormControl) => {
    // any component logic here
    if (!this.email(c.value)) {
      return { ['email']: true };
    } else {
      return {
        ['email']: false,
      };
    }
  };

  email = (c: FormControl) => {
    let email: string = c.value;
    let result = null;
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email) && email != '') {
      return {
        invalid: true,
      };
    }
    return result;
  };
  authemail = (c: FormControl) => {
    let email: string = c.value;
    let result = null;
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      return {
        invalid: true,
      };
    }
    return result;
  };

  emptyString = (c: FormControl) => {
    var regex = /^\s*$/;
    let result = null;

    if (regex.test(c.value)) {
      result = { invalid: true };
    }
    return result;
  };

  bloodGroup = (c: FormControl) => {
    var regex = /^(A|B|AB|O)[+-]$/i;
    let result = null;

    if (!regex.test(c.value)) {
      result = { invalid: true };
    }
    return result;
  };

  mobileNumber = (c: FormControl) => {
    var regex =
      /^[\d]{2,4}[- ]?[\d]{3}[- ]?[\d]{3,5}|([0])?(\+\d{1,2}[- ]?)?[6789]{1}\d{9}$/;
    let result = null;
    if (!regex.test(c.value)) {
      result = { invalid: true };
    }
    return result;
  };

  formConfirmPassword = (c: FormControl) => {
    var result = null;
    var confirm_password = c.value;
    var password = c.root.get('password')?.value;
    if (confirm_password != password) {
      result = { mismatch: true };
    }
    return result;
  };

  userRole = (c: FormControl) => {
    var result = null;
    var role = 'SUPERADMIN';
    var admin = upperCase(c.root.get('role')?.value);
    if (role == admin) {
      result = { invalid: true };
    }
    return result;
  };

  gstNo = (c: FormControl) => {
    var result = null;
    var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!regex.test(c.value)) {
      result = { invalid: true };
    }

    return result;
  };
}
