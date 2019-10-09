import { Action } from '@ngrx/store';

export const PIZZA_ADDED_TO_CART = 'PIZZA_ADDED_TO_CART';
export const FETCH_MENU_SUCCESS = 'PIZZA_MENU_LOADED';
export const PIZZA_REMOVED_FROM_CART = 'PIZZA_REMOVED_FROM_CART';
export const ALL_PIZZAS_REMOVED_FROM_CART = 'ALL_PIZZAS_REMOVED_FROM_CART';
export const FETCH_MENU_REQUEST = 'FETCH_MENU_REQUEST';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const CHECK_USER_FOR_AUTH = 'CHECK_USER_FOR_AUTH';
export const USER_LOGOUT = 'USER_LOGOUT';

export class UserLogout implements Action {
  readonly type: string = USER_LOGOUT;
}

export class CheckUserForAuth implements Action {
  readonly type: string = CHECK_USER_FOR_AUTH;
}

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
  constructor(public payload: {}) {}
}

export class FetchDataRequest implements Action {
  readonly type: string = FETCH_MENU_REQUEST;
}

export class FetchDataError implements Action {
  readonly type: string = FETCH_DATA_ERROR;
  constructor(public payload: {}) {}
}

export class PostLoginSuccess implements Action {
  readonly type: string = POST_LOGIN_SUCCESS;
  constructor(public payload: {}) {}
}
