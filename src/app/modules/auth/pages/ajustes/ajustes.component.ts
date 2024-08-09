import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { clases } from 'src/app/core/Clases';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
  providers: [
    clases
  ]
})
export class AjustesComponent implements DoCheck, OnInit{

  public ajustesForm: FormGroup
  public user: User | null
  public srcImage: string = "../../../../../assets/userUnknow.jpg"
  public imageFileNew: any
  public dateValid: boolean | undefined;
  public token: String | null;
  public status: boolean | undefined

  constructor(
    private _fb: FormBuilder,
    private _clases: clases,
    private _userService: UserService,
  ) {
    this.user = _userService.getLocalUSer();
    this.token = _userService.getLocalToken();
    this.ajustesForm = _fb.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email],
      birthdate: [new Date(this.user?.birthdate?.replace("Z", "") ?? "") ],
      image: [""],
    })
  }

  ngOnInit(): void {
    if (this.user?.image == null) {
      // this.srcImage = global.url + "avatar/" + this.user["image"]
    } else{
      this.srcImage = "../../../assets/images/user-default.png"
    }
  }

  ngDoCheck(): void {
    this.user = this._userService.getLocalUSer();
    this.token = this._userService.getLocalToken();
  }

  onSubmit(): void {

    if (!this.ajustesForm.valid) {
      return;
    }

    let user: User = {
      name: this.ajustesForm.value.name
    }

    this.updateUser(user)
    
    
  }

  updateUser(user: User){
    this._userService.update(user, this.token).subscribe({
      next: ((response: any) => {
        if (parseInt(response.status) == 200) {
          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("token", response.token)
          this.status = true
        } else{
          this.status = false
        }
      })
    })
  }
  
  uploadimage(e: any): void {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.srcImage = event.target.result;
      }
      this.imageFileNew = e.target.files[0];
    }
  }
}
