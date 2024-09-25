import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product

  public s3Url: string
  public image!: string 

  constructor(
    
  ){
    this.s3Url = environment.s3url
  }
  
  ngOnInit(): void {
    this.image = JSON.parse(this.product.image == undefined ? "" : this.product.image.toString())[0]
  }

  addCart(): void{

  }

  viewStock(stock: number | undefined): boolean {
    
    if(stock != undefined && stock > 0){
      return true
    }
    
    return false
  }

}
