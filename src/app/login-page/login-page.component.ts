import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginPageService} from './login-page.service';
import {Store} from '@ngrx/store';
import * as pizzaMenuActions from '../home-page/menu-list/store/menu-list.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
  isLoading = false;
  hasError: string;
  username: string;
  userLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private store: Store<{pizzaMenu: {cartItems: string[]}}>,
    private loginService: LoginPageService) {}
    ngOnInit() {
      this.store.select('pizzaMenu');
    }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) { return; }
    const clientName = form.value.username;
    const password = form.value.password;
    this.loginService
      .login(clientName, password)
      .subscribe(res => {
        this.isLoading = false;
        this.username = res[0].clientName;
        this.store.dispatch(new pizzaMenuActions.PostLoginSuccess(res[0]));
        this.userLoggedIn = true;
        setTimeout(() => this.router.navigate(['/']), 2000);
        }, error => {
        if (error.status === 404) {
          this.hasError = `User doesn't exist`;
          this.isLoading = false;
        } else {
          this.hasError = 'Error. Please try again';
          this.isLoading = false; }});
    form.reset();
  }
}
