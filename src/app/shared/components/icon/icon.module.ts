// Third Example - icon module
import { NgModule } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [],
})
export class IconModule {
  private path: string = 'assets/icons';
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('user', this.setIconPath(`${this.path}/user.svg`))
      .addSvgIcon(
        'create-user',
        // this.setIconPath(`${this.path}/createuser.svg`)
        this.setIconPath('../assets/icons/createuser.svg')
        //
      )
      .addSvgIcon(
        'create-lead',
        this.setIconPath('../assets/icons/convertlead.svg')
      )


      // .addSvgIcon(
      //   'user-login',
      //   this.setIconPath('../assets/icons/login.svg')
      // )
      .addSvgIcon(
        'signup',
        this.setIconPath('../assets/icons/signup.svg')
      )
      .addSvgIcon(
        'forget',
        this.setIconPath('../assets/icons/forget.svg')
      )
      .addSvgIcon(
        'comman',
        this.setIconPath('../assets/icons/sidecommon.svg')
      )
      .addSvgIcon(
        'import',
        this.setIconPath('../assets/icons/import.svg')
      );
      


  }

  private setIconPath(icon: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(icon);
  }
}
