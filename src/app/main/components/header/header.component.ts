import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/user';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

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
      var org = JSON.parse(localStorage.getItem('orgid') || '{}');
    } catch (error) {}
  }
}
