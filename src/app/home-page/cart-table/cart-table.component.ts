import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as pizzaActions from '../menu-list/store/menu-list.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})

export class CartTableComponent implements OnInit {
  private currentOrderTotal: any;
  cartItems: Observable<{cartItems: string[]}>;
  constructor(private store: Store<{pizzaMenu: {cartItems: string[]}}>) {}
  ngOnInit() {
    this.cartItems = this.store.select('pizzaMenu');
    this.store.select('pizzaMenu').subscribe(data => this.currentOrderTotal = data.orderTotal);
  }
  onIncrease(id) {
    this.store.dispatch(new pizzaActions.PizzaAddedToCart(id));
  }
  onDecrease(id) {
    this.store.dispatch(new pizzaActions.PizzaRemovedFromCart(id));
  }
  onDelete(id) {
    this.store.dispatch(new pizzaActions.AllPizzasRemovedFromCart(id));
  }
}
