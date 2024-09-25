import { createReducer, on } from "@ngrx/store";
import { ProductState } from "src/app/core/models/Product.state";
import { loadedProducts, loadProducts } from "./products.actions";

export const initialState: ProductState = {products: [] }

export const productReducer = createReducer(
    initialState,
    on(loadedProducts, (state, { products, count}) => {
        return { ...state, products: products , count: count}
    }),
)

