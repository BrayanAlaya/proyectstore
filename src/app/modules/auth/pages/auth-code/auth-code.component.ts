import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit {

  public emailValid: boolean | undefined = true
  public authCodeForm: FormGroup
  public validForm: boolean = true
  public action: string | null;
  public codeSent: boolean = false
  public user: User | null | undefined;

  public codeValid: boolean = true

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.authCodeForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      code1: ["", [Validators.required]],
      code2: ["", [Validators.required]],
      code3: ["", [Validators.required]],
      code4: ["", [Validators.required]],
    })
    this.emailValid = this.authCodeForm.get("email")?.valid;
    this.action = _route.snapshot.queryParamMap.get("action")
  }

  ngOnInit(): void {
    this.user = this._userService.getLocalUSer();
    if (this.user != null) {
      this.authCodeForm.setValue({
        email: this.user.email,
        code1: "",
        code2: "",
        code3: "",
        code4: "",
      })
    }
  }

  onSubmit(): void {

    if (!this.authCodeForm.valid) {
      return
    }

    const authCode = this.authCodeForm.value.code1 + this.authCodeForm.value.code2 + this.authCodeForm.value.code3 + this.authCodeForm.value.code4

    const authUser: User = {
      email: this.authCodeForm.value.email,
      auth_code: authCode
    }

    this._userService.authCode(authUser).subscribe({
      next: (response: any) => {
        console.log(response)
        if (parseInt(response.status) == 200) {
          this._router.navigate(["/auth/auth_account"], {
            queryParams: {
              token: response.token
            }
          })
        } else if (parseInt(response.status) == 429) {
          this.codeValid = false
        } else if (parseInt(response.status) == 400){

        }
      }
    })


  }

  sendCode(): void {
    if (!this.authCodeForm.get("email")?.valid) {
      return
    }

    let user: User = {
      email: this.authCodeForm.value.email
    }

    this._userService.sendAuthCode(user).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) == 200) {
          this.codeSent = true
          this.codeValid = true
        }
      }
    })
  }

  getErrorMessage() {

    if (this.authCodeForm.get("email")?.getError("required")) {
      return 'Email obligatorio';
    }

    return this.authCodeForm.get("email")?.hasError('email') ? 'Email no válido' : '';
  }
}
