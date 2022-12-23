import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AuthLogoutReqDto } from '../../models/auth';
import { Users } from '../../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  menu_list = [
    {
      icon_name: 'grid_view',
      link: 'account',
      tooltip: 'Account',
      name: 'Account',
    },
    {
      icon_name: 'grid_view',
      link: 'changepassword',
      tooltip: 'Change Password',
      name: 'Change Password',
    },
  ];
  constructor(private authservice: AuthService) {}
  userData: Users = new Users();

  ngOnInit(): void {
    this.getUserInfo();
    this.getData();
  }

  getUserInfo() {
    let data = localStorage.getItem('user');
    if (data != '' && data != null) {
      this.userData = JSON.parse(data);
    }
  }
  async getData() {
    try {
    } catch (error) {}
  }

  logout() {
    let logoutDto = new AuthLogoutReqDto();

    logoutDto.refreshtoken = localStorage.getItem('refreshtoken') || '';
    this.authservice.Logout(logoutDto);
  }
}

// export class SettingsComponent {
//   @Input() isExpanded: boolean = false;
//   @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

//   handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
// }
