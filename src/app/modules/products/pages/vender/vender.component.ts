import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ProductsService } from '../../services/products.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/core/models/Category';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public tab: number = 0
  public buttonTabText = "Continuar"
  public srcImage: Array<Object> = []
  public imagesArray: any = []
  public srcIndex: number = 0
  public venderForm: FormGroup
  public statusMessage: string = ""
  public status !: boolean
  private token: String | null
  public categories: Array<Category> = []

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductsService,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.srcImage.push("../../../../../assets/imageNotFound.jpg")
    this.venderForm = this._fb.group({
      name: ["", [Validators.required, Validators.maxLength(40)]],
      price: ["", [Validators.required, Validators.pattern(/^\d{1,4}(\.\d)?$/)]],
      amount: ["", [Validators.required, Validators.pattern(/^\d{1,4}$/)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      category: ["", [Validators.required]],
    }),
      this.token = _userService.getLocalToken()
    _categoryService.get().subscribe({
      next: (c => {
        this.categories = c.data
      })
    })
  }

  selectTab(index: number) {
    this.tabGroup.selectedIndex = index;

  }

  nextTab(): number {

    this.tab += 1
    if (this.tab == this.tabGroup._tabs.length) {
      this.tab = 0
    }

    if (this.tab == (this.tabGroup._tabs.length - 1)) {
      this.buttonTabText = "Inicio"
    } else {
      this.buttonTabText = "Continuar"
    }

    return this.tab

  }

  onSubmit(): void {

    if (!this.venderForm.get("name")?.valid) {
      this.status = false
      this.statusMessage = "Llenar todos los campos"
      return
    }
    if (!this.venderForm.get("price")?.valid) {
      this.status = false
      this.statusMessage = "Precio ingresado es incorrecto"
      return
    }
    if (!this.venderForm.get("amount")?.valid) {
      this.status = false
      this.statusMessage = "Cantidad ingresada incorrecta"
      return
    }
    if (!this.venderForm.get("description")?.valid) {
      this.status = false
      this.statusMessage = "Llenar todos los campos"
      return
    }
    if (!this.venderForm.get("category")?.valid) {
      this.status = false
      this.statusMessage = "Elegir una categoria"
      return
    }

    if (this.imagesArray.length < 1) {
      this.status = false
      this.statusMessage = "Elegir almenos una imagen"
      return
    }

    if (!this.venderForm.valid) {
      this.status = false
      this.statusMessage = "Llenar los campos correctamente"
      return
    }

    const productData: FormData = new FormData()
    productData.append("name", this.venderForm.value.name)
    productData.append("price", this.venderForm.value.price)
    productData.append("stock", this.venderForm.value.amount)
    productData.append("description", this.venderForm.value.description)
    productData.append("category_id", this.venderForm.value.category)
    for (let i = 0; i < this.imagesArray.length; i++) {
      productData.append("image", this.imagesArray[i])
    }

    this._productService.create(productData, this.token).subscribe({
      next: (response: any) => {
        console.log(response)

        if (parseInt(response.status) == 200) {
          this.status = true
          this.statusMessage = "Producto publicado correctamente"
        } else {
          this.status = false
          this.statusMessage = "Hubo un error al publicar el producto"
        }

      }
    })

  }

  uploadimage(e: any): void {

    let images = e.target.files

    if (images.length > 0 && images.length < 5) {
      this.srcImage = []
      this.imagesArray = []
      this.srcIndex = 0
      for (let i = 0; i < images.length; i++) {
        this.imagesArray.push(images[i]);

        var reader = new FileReader();
        reader.readAsDataURL(images[i])
        reader.onload = (event: any) => {
          this.srcImage.push(event.target.result)
        }
      }
      console.log(this.imagesArray)
    }
  }

  deleteImage(): void {
    this.imagesArray = []
    this.srcImage = []
    this.srcIndex = 0
  }

  onSliderIconBackClick(): void {
    if (this.srcIndex > 0) {
      this.srcIndex--
    }
  }

  onSliderIconForwardClick(): void {
    if (this.srcIndex < this.imagesArray.length - 1) {
      this.srcIndex++
    }
  }
}
