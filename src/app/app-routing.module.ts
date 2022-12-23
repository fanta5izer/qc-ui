import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './core/pages/forgotpassword/forgotpassword.component';
import { LoginComponent } from './core/pages/login/login.component';
import { PagenotfoundComponent } from './core/pages/pagenotfound/pagenotfound.component';
import { SignUpComponent } from './core/pages/signup/signup.component';
import { AppSettingsGuardService } from './main/guards/appsetting.guard';
import { AuthGuard } from './main/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AppSettingsGuardService],
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    canActivate: [AppSettingsGuardService],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AppSettingsGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
