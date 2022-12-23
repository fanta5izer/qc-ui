import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '../shared/components/icon/icon.module';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { UserMergeComponent } from './pages/usermerge/usermergecomponent';
import { AccountComponent } from './pages/account/account.component';
import { AvatarModule } from 'ngx-avatars';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './guards/auth.guard';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './pages/settings/settings.component';
import { EmployeeMergeComponent } from './pages/employeemerge/employeemerge.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ReferencelistComponent } from './pages/referencelist/referencelist.component';
import { ReferencelistMergeComponent } from './pages/referencelistmerge/referencelistmerge.component';
import { CustomerComponent } from './pages/customer/customercomponent';
import { CustomerMergeComponent } from './pages/customermerge/customermerge.component';
import { InvoiceComponent } from './pages/Invoice/invoice.component';
import { InvoiceMergeComponent } from './pages/invoicemerge/invoicemerge.component';
import { ImportsourceComponent } from './pages/importsource/importsource.component';
import { SourceListComponent } from './pages/sourcelist/sourcelist.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { NgSelectComponents } from './components/ng-select/ng-select.component';
import { InvoicecollectionComponent } from './pages/invoicecollection/invoicecollection.component';
import { ImportreferenceComponent } from './pages/importreference/importreference.component';
import { ImportemployeeComponent } from './pages/importemployee/importemployee.component';
import { ImportcustomerComponent } from './pages/importcustomer/importcustomer.component';

@NgModule({
  declarations: [
    UserComponent,
    UserMergeComponent,
    AccountComponent,
    MainComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    ChangepasswordComponent,
    AlertPopupComponent,
    SettingsComponent,
    EmployeeMergeComponent,
    EmployeeComponent,
    ReferencelistComponent,
    ReferencelistMergeComponent,
    CustomerComponent,
    CustomerMergeComponent,
    InvoiceComponent,
    InvoiceMergeComponent,
    ImportsourceComponent,
    SourceListComponent,
    ScheduleComponent,
    NgSelectComponents,
    InvoicecollectionComponent,
    ImportreferenceComponent,
    ImportemployeeComponent,
    ImportcustomerComponent,
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MainRoutingModule,
    TranslateModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [AuthGuard],
})
export class MainModule {}
