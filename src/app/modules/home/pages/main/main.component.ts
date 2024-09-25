import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/Category';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public imgBGHP: string = "../../../../../assets/bghp.webp"
  public hoveredIdCategory: Number | null = null;

  public categories$: Observable<any> = new Observable()

  constructor(
    private _store: Store<AppState>
  ) {

  }

  onHoverCategories(index: Number | undefined, state: boolean): void {
    if (index != undefined) {
      this.hoveredIdCategory = state ? index : null;
    }
  }

  
  ngOnInit(): void {

    this.categories$ = this._store.select(selectCategories)

  }

}
