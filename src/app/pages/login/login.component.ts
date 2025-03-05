import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading: boolean = false;
  restext !: string;
  error :boolean = true ;
  private readonly _AuthService = inject(AuthService)
  private readonly Router = inject(Router)
  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  Login(): void {
    if (this.loginform.valid) {
      console.log(this.loginform.value)
      this.loading = true;
      this._AuthService.signin(this.loginform.value).subscribe({
        next: (res) => {
          this.loading = false;
          console.log(res)
          sessionStorage.setItem('token', res.token);
          this._AuthService.decodedtoken();
          this.Router.navigate(['/home'])
        },
        error: (err) => {
          this.loading = false;
          this.error = false
          

        }
      })
    }
    else {
      this.loginform.markAllAsTouched();
    }


  }

}

