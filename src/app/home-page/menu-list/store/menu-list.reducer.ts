import * as pizzaMenuActions from './menu-list.actions';

const initialState = {
  pizzaMenu: [{id: 1, pizza_name: 'aaa', cooking_time: 10}],
  cartItems: [],
  orderTotal: 0
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
        pizzaMenu: action.payload
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
