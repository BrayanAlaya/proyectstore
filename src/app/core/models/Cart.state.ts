import { Cart } from "./Cart";

export interface CartState{
    loading: boolean,
    cart: ReadonlyArray<Cart>
}
