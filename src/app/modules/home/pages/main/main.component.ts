import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  public imgBGHP: string = "../../../../../assets/bghp.webp"
  public categories: Array<Category> = []
  public hoveredIdCategory: Number | null = null;

  constructor(
    private _categoryService: CategoryService
  ){

  }
  
  onHoverCategories(index: Number | undefined, state: boolean): void {
    if (index != undefined) {
      this.hoveredIdCategory = state ? index : null;
    }
  }

  ngOnInit(): void {
      this._categoryService.get().subscribe({
        next: (response : any) => {
          if (parseInt(response.status) == 200) {
            this.categories = response.data
          }
        }
      })
  }

}
