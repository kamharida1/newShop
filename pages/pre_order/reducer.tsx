import { ShippingAddress } from "../../src/models";

interface State {
  addresses: ShippingAddress[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'FETCH_ADDRESSES_REQUEST' }
  | { type: 'FETCH_ADDRESSES_SUCCESS'; payload: ShippingAddress[] }
  | { type: 'FETCH_ADDRESSES_FAIL'; payload: string }
  | { type: 'ADD_ADDRESS'; payload: ShippingAddress }
  | { type: 'UPDATE_ADDRESS'; payload: ShippingAddress }
  | { type: 'DELETE_ADDRESS'; payload: string };


export const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_ADDRESSES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ADDRESSES_SUCCESS":
      return { ...state, addresses: action.payload, loading: false };
    case "FETCH_ADDRESSES_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map((address) => 
          address.id === action.payload.id ? action.payload : address
        ),
      }
    case "DELETE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload
        ),
      };
    default:
      throw new Error("Unsupported action type: ${action.type}");
  }
};

export const fetchRequest = (): Action => ({
  type: "FETCH_ADDRESSES_REQUEST",
});

export const fetchFail = (message: string): Action => ({
  type: "FETCH_ADDRESSES_FAIL",
  payload: message
});

export const fetchSuccess = (addresses: ShippingAddress[]): Action => ({
  type: "FETCH_ADDRESSES_SUCCESS",
  payload: addresses,
});

export const updateAddress = (address: ShippingAddress): Action => ({
  type: "UPDATE_ADDRESS",
  payload: address,
});

export const addAddress = (address: ShippingAddress): Action => ({
  type: "ADD_ADDRESS",
  payload: address,
});

export const deleteAddress = (addressId: string): Action => ({
  type: "DELETE_ADDRESS",
  payload: addressId,
});