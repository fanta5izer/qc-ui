import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
/* External Libraries */
import { AngularSlickgridModule } from 'angular-slickgrid';
import { ToastrModule } from 'ngx-toastr';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';

/* User Defined */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

//translation

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './main/guards/auth.guard';
import { AppSettingsGuardService } from './main/guards/appsetting.guard';
import { InvoicecollectionComponent } from './main/pages/invoicecollection/invoicecollection.component';

/* dynamic added for Angular Slickgrid */
// @dynamic
@NgModule({
  declarations: [AppComponent],
  imports: [
    /* angular defaults */
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    /* external */
    AngularSlickgridModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,

    /* user defined */
    CoreModule.forRoot(),

    //translation
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    AppRoutingModule,
    MatToolbarModule,
    FontAwesomeModule,
  ],
  providers: [
    MatMomentDateModule,
    MatTooltipModule,
    MatToolbarModule,
    AuthGuard,
    AppSettingsGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
