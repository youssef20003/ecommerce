
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  restext !: string;
  loading : boolean = false;

  registerform = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  } ,this.compare);



  

  submitRegisterForm(): void {

    if (this.registerform.valid) {
      this.loading = true;
      console.log(this.registerform.value)  
      this._AuthService.signup(this.registerform.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/login']);
          this.loading = false;
          console.log(res)
        },
        error: (err) => {
          this.loading = false;
          console.log(err)
          this.restext = err.error.message
        }
      })


    }
    else{
      this.registerform.markAllAsTouched();
    }
  }



  compare(fgroup: AbstractControl) {
    return fgroup.get('password')?.value === fgroup.get('rePassword')?.value
      ? null
      : { missMatch: true };
  }

}


