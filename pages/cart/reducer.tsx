import { LineItem } from "../../src/models";
import _ from "lodash";


interface State {
  carts: LineItem[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_CART_REQUEST" }
  | { type: "FETCH_CART_SUCCESS"; payload: LineItem[] }
  | { type: "FETCH_CART_FAIL"; payload: string }
  | { type: "ADD_LINE_ITEM"; payload: LineItem }
  | { type: "UPDATE_QUANTITY"; payload: LineItem }
  | { type: "DELETE_CART"; payload: string }
  | { type: "RESET_CART" };

export const initialState = {
  carts: [],
  loading: false,
  error: null,
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "FETCH_CART_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CART_SUCCESS":
      return { ...state, carts: action.payload, loading: false };
    case "FETCH_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    // case "ADD_TO_CART":
    //   return { ...state, carts: [...state.carts, action.payload] };
    case "ADD_LINE_ITEM":
      const { product, qty, userSub } = action.payload;
      const lineItem = _.find(
        state.carts,
        (lineItem) => lineItem.product.id === product.id
      );
      const otherLines = _.filter(
        state.carts,
        (lineItem) => lineItem.product.id !== product.id
      );
      if (!lineItem) {
        return [
          ...otherLines,
          {
            qty,
            userSub,
            price: product.price,
            total: product.price,
            product,
          },
        ];
      }

      const newQty = lineItem.qty + 1;
      return [
        ...otherLines,
        {
          ...lineItem,
          qty: newQty,
          total: newQty * product.price,
        },
      ];
    case "UPDATE_QUANTITY":
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === action.payload.id ? action.payload : cart
        ),
      };
    case "DELETE_CART":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };
    case "RESET_CART":
      return initialState;
    default:
      throw new Error("Unsupported action type: ${action.type}");
  }
};

export const fetchRequest = (): Action => ({
  type: "FETCH_CART_REQUEST",
});

export const fetchFail = (message: string): Action => ({
  type: "FETCH_CART_FAIL",
  payload: message,
});

export const fetchSuccess = (carts: BagProduct[]): Action => ({
  type: "FETCH_CART_SUCCESS",
  payload: carts,
});

export const updateQuantity = (cart: BagProduct): Action => ({
  type: "UPDATE_QUANTITY",
  payload: cart,
});

export const addToCart = (cart: BagProduct): Action => ({
  type: "ADD_TO_CART",
  payload: cart,
});

export const deleteCart = (cartId: string): Action => ({
  type: "DELETE_CART",
  payload: cartId
});
