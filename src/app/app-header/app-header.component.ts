import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as pizzaMenuActions from '../home-page/menu-list/store/menu-list.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  logoutLink = false;
  hideLoginSignUpLinks = true;

  constructor(
    private router: Router,
    private store: Store<{ pizzaMenu: { cartItems: string[]}}>) {}

  ngOnInit() {
    this.store.dispatch(new pizzaMenuActions.CheckUserForAuth());
    this.store.select('pizzaMenu').subscribe(data => console.log(data));
    if (window.localStorage.getItem('clientName')) {
      this.logoutLink = true;
    }
    if (window.localStorage.getItem('clientName')) {
      return this.hideLoginSignUpLinks = false;
    }
  }
  userLogout() {
    this.store.dispatch(new pizzaMenuActions.UserLogout());
  }
}


