import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/core/models/User';
import { DatePipe } from '@angular/common';
import { clases } from "../../../../core/Clases";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe, clases]
})
export class RegisterComponent {

  public registerForm: FormGroup
  public hide = true;
  public hide2 = true;
  public dateValid: boolean = true;
  public emailValid: boolean | undefined = true;
  public passwordValid: boolean = true;
  public validForm: boolean = true

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _datePipe: DatePipe,
    private _clases: clases
  ) {
    this.registerForm = this._fb.group({
      name: ["", [Validators.required]],
      birthDate: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      password2: ["", [Validators.required]]
    })
    this.emailValid = this.registerForm.get("email")?.valid;
  }

  onSubmit(): void {

    // console.log(this._datePipe.transform(this.registerForm.value.birthDate, "yyyy/MM/dd"))
    
    // return;
    if (this._clases.calcularEdad(this.registerForm.value.birthDate) < 18) {
      this.dateValid = false;
    } else{
      this.dateValid = true;
    }
    
    if (this.registerForm.value.password != this.registerForm.value.password2) {
      this.passwordValid = false;
    } else{
      this.passwordValid = true
    }
    
    if (!this.registerForm.valid || !this.dateValid || !this.passwordValid) {
      return;
    }

    let user: User = {
      id: 0,
      name: this.registerForm.value.name,
      birthDate: this._datePipe.transform(this.registerForm.value.birthDate, "yyyy-dd-MM") || "",
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      rol: 0,
      createdDate: "",
      image: "",
      eliminado: 0
    }

    console.log(user)

    this._userService.register(user).subscribe({
      next: ((response: any) => {
        console.log(response)
      })
    })

  }

  getErrorMessage() {

    if (this.registerForm.get("email")?.getError("required")) {
      return 'Email obligatorio';
    }

    return this.registerForm.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }
}
