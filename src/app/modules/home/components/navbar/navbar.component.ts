import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/core/models/User';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/core/models/Category';
import { Router } from '@angular/router';

const SEARCH_BUTTON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

const SLIDE_BUTTON = `<svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="menu-hamburger"> <path id="vector" d="M3 6H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_3" d="M3 18H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg>`;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnChanges,OnInit{

  public slide: boolean = false;
  public user!: User | null;
  public categories: Array<Category> = []

  constructor(
    private _formBuilder: FormBuilder, 
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {

    iconRegistry.addSvgIconLiteral('search-button', sanitizer.bypassSecurityTrustHtml(SEARCH_BUTTON));
    iconRegistry.addSvgIconLiteral('slide-button', sanitizer.bypassSecurityTrustHtml(SLIDE_BUTTON));

    this.user = this._userService.getLocalUSer();
  }

  ngOnInit(): void {
    this.user = this._userService.getLocalUSer();
    this._categoryService.get().subscribe({
      next: (r => {
        this.categories = r.data
      })
    })
  }

  ngOnChanges(): void {
    this.user = this._userService.getLocalUSer();
  }

  logOut(): void{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    this.user = this._userService.getLocalUSer();
  }

}
