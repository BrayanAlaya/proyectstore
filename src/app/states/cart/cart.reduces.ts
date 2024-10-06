import { createReducer, on } from "@ngrx/store";
import { CartState } from "src/app/core/models/Cart.state";
import { loadCart, loadedCart } from "./cart.actions";

export const initialState: CartState = {loading: false, cart: [] }

export const cartReducer = createReducer(
    initialState,
    on(loadCart, (state) => {
        return { ...state, loading: true}
    }),
    on(loadedCart, (state, { cart }) => {
        return { ...state, loading: false, cart: cart }
    }),
)

