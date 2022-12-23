import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  faShop,
  faAddressCard,
  faMobileScreenButton,
  faCalendarDays,
  faStore,
} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'main-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  shop = faShop;
  add = faAddressCard;
  mob = faMobileScreenButton;
  task = faCalendarDays;
  store = faStore;
  constructor(
    
    private router: Router,
  ) {}

  

  ngOnInit(): void {
   
  }
  
}
