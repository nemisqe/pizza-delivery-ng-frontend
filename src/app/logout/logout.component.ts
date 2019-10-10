import {Component, OnInit} from '@angular/core';
import * as pizzaMenuActions from '../home-page/menu-list/store/menu-list.actions';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<{ pizzaMenu: { cartItems: string[]}}>) {}
  ngOnInit() {
    this.store.dispatch(new pizzaMenuActions.UserLogout());
    this.router.navigate(['/']);
  }
}
