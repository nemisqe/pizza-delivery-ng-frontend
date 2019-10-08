import { Action } from '@ngrx/store';

export const PIZZA_ADDED_TO_CART = 'PIZZA_ADDED_TO_CART';
export const FETCH_MENU_SUCCESS = 'PIZZA_MENU_LOADED';
export const PIZZA_REMOVED_FROM_CART = 'PIZZA_REMOVED_FROM_CART';
export const ALL_PIZZAS_REMOVED_FROM_CART = 'ALL_PIZZAS_REMOVED_FROM_CART';

export class FetchMenuSuccess implements Action {
  readonly type: string = FETCH_MENU_SUCCESS;
  constructor(public payload: {}) {}
}

export class PizzaAddedToCart implements Action {
  readonly type: string = PIZZA_ADDED_TO_CART;
  constructor(public payload: {}) {}
}

export class PizzaRemovedFromCart implements Action {
  readonly type: string = PIZZA_REMOVED_FROM_CART;
  constructor(public payload: {}) {}
}

export class AllPizzasRemovedFromCart implements Action {
  readonly type: string = ALL_PIZZAS_REMOVED_FROM_CART;
  constructor(public payload: {}) {
  }
}
