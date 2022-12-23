import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main.component';
import { AccountComponent } from './pages/account/account.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { CustomerComponent } from './pages/customer/customercomponent';
import { CustomerMergeComponent } from './pages/customermerge/customermerge.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeMergeComponent } from './pages/employeemerge/employeemerge.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportcustomerComponent } from './pages/importcustomer/importcustomer.component';
import { ImportemployeeComponent } from './pages/importemployee/importemployee.component';
import { ImportreferenceComponent } from './pages/importreference/importreference.component';
import { ImportsourceComponent } from './pages/importsource/importsource.component';
import { InvoiceComponent } from './pages/Invoice/invoice.component';
import { InvoicecollectionComponent } from './pages/invoicecollection/invoicecollection.component';
import { InvoiceMergeComponent } from './pages/invoicemerge/invoicemerge.component';
import { ReferencelistComponent } from './pages/referencelist/referencelist.component';
import { ReferencelistMergeComponent } from './pages/referencelistmerge/referencelistmerge.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SourceListComponent } from './pages/sourcelist/sourcelist.component';
import { UserComponent } from './pages/user/user.component';
import { UserMergeComponent } from './pages/usermerge/usermergecomponent';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'sourcelist',
            pathMatch: 'full',
          },
          // {
          //   path: 'dashboard',
          //   component: DashboardComponent,
          // },

          {
            path: 'user',
            component: UserComponent,
          },
          {
            path: 'usermerge',
            component: UserMergeComponent,
          },
          {
            path: 'employee',
            component: EmployeeComponent,
          },
          {
            path: 'employeemerge',
            component: EmployeeMergeComponent,
          },
          {
            path: 'importemployee',
            component: ImportemployeeComponent,
          },
          {
            path: 'referencelist',
            component: ReferencelistComponent,
          },
          {
            path: 'referencelistmerge',
            component: ReferencelistMergeComponent,
          },
          { path: 'importreference', component: ImportreferenceComponent },
          {
            path: 'customer',
            component: CustomerComponent,
          },
          {
            path: 'customermerge',
            component: CustomerMergeComponent,
          },
          {
            path: 'importcustomer',
            component: ImportcustomerComponent,
          },
          {
            path: 'invoice',
            component: InvoiceComponent,
          },
          {
            path: 'invoicemerge',
            component: InvoiceMergeComponent,
          },
          {
            path: 'importsource',
            component: ImportsourceComponent,
          },
          {
            path: 'sourcelist',
            component: SourceListComponent,
          },
          {
            path: 'schedule',
            component: ScheduleComponent,
          },

          {
            path: 'settings',
            component: SettingsComponent,
            children: [
              {
                path: '',
                redirectTo: 'account',
                pathMatch: 'full',
              },
              {
                path: 'account',
                component: AccountComponent,
              },
              {
                path: 'changepassword',
                component: ChangepasswordComponent,
              },
            ],
          },
          {
            path: 'invoicecollection',
            component: InvoicecollectionComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
