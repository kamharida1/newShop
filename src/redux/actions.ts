import { Product } from "../models";

export const addLineItem = (product: Product, quantity: number, userSub: string) => ({
    type: "ADD_LINE_ITEM",
    payload: {
      product,
      quantity,
      userSub,
    }
});

export const startNewOrder = () => ({
    type: "START_NEW_ORDER",
});