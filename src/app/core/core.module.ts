import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceService } from './service/reference.service';
import { StorageService } from './service/storage.service';
import { JsonUtilService } from './util/json-util.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './util/app.interceptor';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../shared/components/icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from '../shared/service/validator/validator.service';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { forEachRight } from 'lodash';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    PagenotfoundComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    PagenotfoundComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ReferenceService,
        StorageService,
        JsonUtilService,
        AuthService,
        ValidatorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true,
          deps: [StorageService, AuthService],
        },
      ],
    };
  }
}
