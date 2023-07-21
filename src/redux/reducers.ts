import { combineReducers } from 'redux';
import _ from 'lodash';
import { LineItem, Product } from '../models';

interface State {
  lineItems: LineItem[];
}



export const orderInitialState = {
  totalQty: 0,
  subTotal: 0,
  tax: 0,
  userSub: '',
  total: 0,
  lineItems: [],
};

type Action = 
  | { type: 'ADD_LINE_ITEM'; payload: { product: Product; quantity: number, userSub: string } }
  | { type: 'START_NEW_ORDER'}


export const lineItemsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_LINE_ITEM":
      const { product, quantity, userSub } = action.payload;
      const lineItem = _.find(state.lineItems, (lineItem) => lineItem.product.id === product.id);
      const otherLines = _.filter(state.lineItems, (lineItem) => lineItem.product.id !== product.id);
      if (!lineItem) {
        return [
          ...otherLines,
          {
            qty: quantity,
            userSub,
            price: product.price,
            total: product.price,
            product
          }
        ];
      }

      const newQty = lineItem.qty + 1;
      return [
        ...otherLines,
        {
          ...lineItem,
          qty: newQty,
          total: newQty * product.price
        }
      ];
    default:
      return state
  }
};

export const orderReducer = (state = orderInitialState, action: Action) => {
  switch (action.type) {
    case 'ADD_LINE_ITEM':
      const { product, quantity, userSub } = action.payload;
      const totalQty = state.totalQty + quantity;
      const subTotal = state.subTotal + product.price;
      const tax = subTotal * 0.08;
      const total = subTotal + tax;
      return {
        ...state,
        tax,
        total,
        userSub,
        subTotal,
        totalQty,
        lineItems: lineItemsReducer(state, action)
      };
    case "START_NEW_ORDER":
      return orderInitialState;
    default:
      return state;
  }
}

export default combineReducers({
    order: orderReducer,
});