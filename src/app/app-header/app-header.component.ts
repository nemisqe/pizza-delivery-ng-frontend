import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as pizzaMenuActions from '../home-page/menu-list/store/menu-list.actions';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  logoutLink = false;
  hideLoginSignUpLinks = true;
  @Input() public userLoggedIn: boolean;

  constructor(
      private router: Router,
      private store: Store<{ pizzaMenu: { cartItems: string[]}}>) {
    this.router.events.subscribe((event) => ( event instanceof NavigationEnd ) && this.handleRouteChange());
  }

  handleRouteChange() {
    let auth: boolean;
    this.store.select('pizzaMenu').subscribe(data => auth = data.isAuthenticated);
    if (auth && this.router.url.includes('/login')) {
      this.router.navigate(['/']);
    }
  }

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
  userLogout(): void {
    this.store.dispatch(new pizzaMenuActions.UserLogout());
    this.userLoggedIn = false;
    this.router.navigate(['/']);
  }
}


