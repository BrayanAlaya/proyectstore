import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductState } from "src/app/core/models/Product.state";

export const selectProducts = (state: AppState) => state.products

export const products = createSelector(
    selectProducts,
    (state: ProductState) => {state.products, state.count}
)
