import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find, map, Observable, of } from 'rxjs';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { loadProducts } from 'src/app/states/products/products.actions';
import { products, selectProducts } from 'src/app/states/products/products.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public nameQuery: string = ""
  public categoryQuery: string = ""

  public searchTitle$: Observable<any> = new Observable<any>
  public categoryTitle$: Observable<any> = new Observable<any>

  public categories$: Observable<any> = new Observable<any>
  public products$: Observable<any> = new Observable<any>

  constructor(
    private _routeA : ActivatedRoute,
    private _store: Store<AppState>,
    private _route: Router
  ){
    this.categories$ = this._store.select(selectCategories) 
    
    this._routeA.queryParamMap.subscribe({
      next: (response: any) => {
        this.nameQuery = response.params.name
        this.categoryQuery = response.params.category
        console.log(this.nameQuery)
        this.searchTitle$ = of(this.nameQuery);
        this.categoryTitle$ = this.categories$.pipe(
          map(categories => categories.categories?.find((category: any) => category.id == parseInt(this.categoryQuery))?.name)
        );
        this._store.dispatch(loadProducts({name:this.nameQuery,page:0, user:"",category: this.categoryQuery,id:""}))
      }
    })
    this.products$ = _store.select(selectProducts)
  }
  setCategory(categoryId: any){
    this._route.navigate([], {
      queryParams: { "category": categoryId },
      queryParamsHandling: 'merge', // Mantiene los otros query params
    });
  }

}
