import { Category } from "./Category";

export interface CategoryState{
    loading: boolean,
    categories: ReadonlyArray<Category>
}
