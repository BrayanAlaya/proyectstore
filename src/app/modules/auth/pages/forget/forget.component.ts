import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {

  public hidePassword: boolean = true;
  public hidePasswordRepeat: boolean = true;
  public validForm: boolean = true;
  public loginForm: FormGroup

  constructor(
    private _fb: FormBuilder
  ){
    this.loginForm = this._fb.group({})
  }

  onSubmit(){

  }

}
