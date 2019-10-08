import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as pizzaActions from '../menu-list/store/menu-list.actions';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css']
})
export class MenuListItemComponent implements OnInit {
  cartItems: Observable<{cartItems: string[]}>;
  pizza: Observable<{pizzaMenu: string[]}>;
  pizzaMenu: string[];
  constructor(
    private http: HttpClient,
    private store: Store<{pizzaMenu: {cartItems: string[]}}>) {

  }

  ngOnInit() {
    this.http.get<string[]>('http://localhost:3001/menu')
      .subscribe(res => {
        this.pizzaMenu = res;
        this.store.dispatch(new pizzaActions.FetchMenuSuccess(res));
      });
    this.cartItems = this.store.select('pizzaMenu');
  }
  onAddedToCart(id) {
    this.store.dispatch(new pizzaActions.PizzaAddedToCart(id));
  }
}
