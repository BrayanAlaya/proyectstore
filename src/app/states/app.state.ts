import { ActionReducerMap } from "@ngrx/store";
import { CategoryState } from "../core/models/Category.state";
import { categoryReducer } from "./category/category.reducers";
import { ProductState } from "../core/models/Product.state";
import { productReducer } from "./products/products.reducer";

export interface AppState {
    categories: CategoryState,
    products: ProductState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    categories: categoryReducer,
    products: productReducer
}
