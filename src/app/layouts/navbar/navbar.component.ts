import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, Inject, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  navcartcount !: number
  cancel !: Subscription


  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.navcartcount = res.numOfCartItems
      }
    })
    this.cancel = this._CartService.cartcount.subscribe({
      next: (value) => {
        this.navcartcount = value
      }

    })

  }
  ngOnDestroy(): void {
    if (this.cancel) {
      this.cancel.unsubscribe();
    }

  }






  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);


  logout() {
    sessionStorage.removeItem('token')
    this.navcartcount = 0;
    this._Router.navigate(['/login'])
    this._AuthService.userinfo = null
  }

}
