import * as pizzaMenuActions from './menu-list.actions';

const initialState = {
  pizzaMenu: [],
  cartItems: [],
  loading: false,
  orderTotal: 0,
  error: null,
  clientName: '',
  isAuthenticated: false
};

const updateCartItems = (cartItems, item, idx) => {

  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),

      ...cartItems.slice(idx + 1)
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const checkAuth = (state) => {
  const item = window.localStorage.getItem('clientName');
  if (item) {
    return {
      ...state,
      clientName: item,
      isAuthenticated: true
    };
  }
  return state;
};

const updateOrder = (state, pizzaId, quantity) => {
  const { cartItems, pizzaMenu, orderTotal } = state;

  const pizza = pizzaMenu.find(({id}) => id === pizzaId);

  const itemIndex = cartItems.findIndex(({id}) => id === pizzaId);

  const item = cartItems[itemIndex];

  const newItem = updateCartItem(pizza, item, quantity);

  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    orderTotal: updateTotalCookingTime(pizza, orderTotal, quantity)
  };
};

const updateCartItem = (pizza, item = {id: pizza.id, name: pizza.pizza_name, count: 0, totalCookingTime: 0 }, quantity) => {
  const { id = pizza.id,
    count = 0,
    name = pizza.pizza_name,
    totalCookingTime = 0 } = item;
  return {
    id,
    name,
    count: count + quantity,
    totalCookingTime: totalCookingTime + quantity * pizza.cooking_time
  };
};

const updateTotalCookingTime = (pizza, orderTotal, quantity) => orderTotal + quantity * pizza.cooking_time;

export const pizzaMenuReducer = (state = initialState, action: pizzaMenuActions) => {
  switch (action.type) {
    case pizzaMenuActions.PIZZA_ADDED_TO_CART:
      return updateOrder(state, action.payload, 1);
    case pizzaMenuActions.FETCH_MENU_SUCCESS:
      return {
        ...state,
        pizzaMenu: action.payload,
        loading: false
      };
    case pizzaMenuActions.FETCH_MENU_REQUEST:
      return {
        ...state,
        loading: true
      };
    case pizzaMenuActions.FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case pizzaMenuActions.USER_LOGOUT:
      window.localStorage.removeItem('clientName');
      window.localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case pizzaMenuActions.CHECK_USER_FOR_AUTH:
      return checkAuth(state);
    case pizzaMenuActions.POST_LOGIN_SUCCESS:
      window.localStorage.setItem('clientName', action.payload[0]);
      localStorage.setItem('token', action.payload[1]);
      return {
        ...state,
        clientName: action.payload.clientName,
        loading: false,
        isAuthenticated: true
      };
    case pizzaMenuActions.PIZZA_REMOVED_FROM_CART:
      return updateOrder(state, action.payload, -1);
    case pizzaMenuActions.ALL_PIZZAS_REMOVED_FROM_CART:
      const item = state.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);
    default:
      return state;
  }
};
