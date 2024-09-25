import { Product } from "./Product";

export interface ProductState{
    products: ReadonlyArray<Product>,
    count?: number
}
