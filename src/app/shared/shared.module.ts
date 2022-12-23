import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* External */
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AngularSlickgridModule } from 'angular-slickgrid';

/* User Defined */
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

/** angular Material */
import { MatCardModule } from '@angular/material/card';
import { CustomValidatorDirective } from './service/directives/custom_validator.directive';
import { ValidatorService } from './service/validator/validator.service';
@NgModule({
  declarations: [FooterComponent, CustomValidatorDirective],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    TranslateModule,
    AngularSlickgridModule,
    MatCardModule,
  ],

  exports: [
    CommonModule,
    FooterComponent,
    NgSelectModule,
    FormsModule,
    AngularSlickgridModule,
    MatCardModule,
    CustomValidatorDirective,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ValidatorService],
    };
  }
}
