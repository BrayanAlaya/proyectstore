import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/core/models/User';
import { CategoryService } from 'src/app/shared/services/category.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { Router } from '@angular/router';

const SEARCH_BUTTON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

const SLIDE_BUTTON = `<svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="menu-hamburger"> <path id="vector" d="M3 6H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_3" d="M3 18H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg>`;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements DoCheck, OnInit {

  public slide: boolean = false;
  public user!: User | null;
  public srcImage: String = "assets/userUnknow.jpg"
  public s3Url: string = environment.s3url

  public categories$: Observable<any> = new Observable()
  public searchInputValue: string = ""

  constructor(
    private _formBuilder: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _store: Store<AppState>,
    private _route: Router
  ) {

    iconRegistry.addSvgIconLiteral('search-button', sanitizer.bypassSecurityTrustHtml(SEARCH_BUTTON));
    iconRegistry.addSvgIconLiteral('slide-button', sanitizer.bypassSecurityTrustHtml(SLIDE_BUTTON));

  }

  search(): void {

    if (this.searchInputValue != "") {
      this._route.navigate(["/products"], {
        queryParams: {
          name: this.searchInputValue
        }
      })
    }

  }

  ngOnInit(): void {

    this.categories$ = this._store.select(selectCategories)

  }

  ngDoCheck(): void {
    this.user = this._userService.getLocalUSer();
    if (this.user?.image != null) {
      this.srcImage = this.s3Url + this.user?.image
    } else {
      this.srcImage = "../../../../../assets/userUnknow.jpg"
    }
  }



  logOut(): void {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

}
