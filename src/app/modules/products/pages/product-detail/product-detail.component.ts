import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { AppState } from 'src/app/states/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CartService } from 'src/app/modules/purchases/services/cart/cart.service';
import { Cart } from 'src/app/core/models/Cart';
import { WishlistService } from 'src/app/modules/wishlist/services/wishlist.service';
import { Wishlist } from 'src/app/core/models/Wishlist';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: Product = { name: "", description: "", image: "", price: 0 }
  public s3Url: string = environment.s3url
  public srcImage: Array<Object> = []
  public srcIndex: number = 0
  public categories$: Observable<any> = new Observable<any>
  public productsList$: Observable<any> = new Observable<any>

  private productId!: number
  public amountForm: FormGroup

  public statusMessage: string = ""
  public status: boolean | undefined

  public saved: boolean = false

  constructor(
    private _productService: ProductsService,
    private _routerA: ActivatedRoute,
    private _store: Store<AppState>,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _cartService: CartService,
    private _whisListService: WishlistService
  ) {
    this.amountForm = _fb.group(
      { amount: [1, [Validators.required, Validators.pattern(/^\d{1,4}$/)]] }
    )
  }

  ngOnInit(): void {


    this._routerA.queryParamMap.subscribe({
      next: (params: any) => {

        const token = this._userService.getLocalToken()
        this._productService.get("", 0, "", "", params.params["id"], token).subscribe({
          next: (response: any) => {
            if (parseInt(response.status) == 200) {
              this.product = response.data[0]
              this.srcImage = []
              this.productId = response.data[0].id

              this.saved = response.wish.some((data: any) => data.product_id == this.productId)
              

              const images = JSON.parse(response.data[0].image)
              for (let i = 0; i < images.length; i++) {
                this.srcImage.push(environment.s3url + images[i])
              }

              this.productsList$ = this._productService.get("", 0, "", this.product.category_id, "").pipe(map(o => o.data.filter((p: any) => p.id != this.product.id)))

              this.categories$ = this._store.select(selectCategories).pipe(map(c => c.categories.find(category => category.id == this.product.category_id)))
            }
          }
        })
      }
    })
  }

  addCart(): void {

    const data: Cart = {
      amount: this.amountForm.value.amount,
      product_id: this.productId
    }

    this._cartService.save(data, this._userService.getLocalToken()).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.statusMessage = 'Añadido Correctamente';
          this.status = true
        } else {
          this.statusMessage = 'Hubo un error, intentalo mas tarde';
          this.status = false
        }
      }
    })

    setTimeout(() => {
      this.statusMessage = '';
      this.status = undefined
    }, 6000);
  }

  addWishList(): void {

    const data: Wishlist = {
      product_id: this.productId
    }

    this._whisListService.save(data, this._userService.getLocalToken()).subscribe({
      next: (response: any) => {
        console.log(response)
        if (parseInt(response.status) == 200) {
          this.saved = !this.saved
        }
      }
    })
  }

  selectImage(i: number): void {
    this.srcIndex = i
  }

  onSliderIconBackClick(): void {
    if (this.srcIndex > 0) {
      this.srcIndex--
    }
  }

  onSliderIconForwardClick(): void {
    if (this.srcIndex < this.srcImage.length - 1) {
      this.srcIndex++
    }
  }

}

