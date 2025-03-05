import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from './../../core/services/cart/cart.service';
import { Icart } from '../../core/interfaces/cart/icart';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartdata: Icart | null = null;
  private readonly _CartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartdata = res.data;
        this._NgxSpinnerService.hide()
      },
      error: (err) => console.log(err)
    });

  } 








  RemoveCartItem(p_id: string): void {
    this._CartService.RemovespecificcartItem(p_id).subscribe({
      next: (res) => {
        console.log(res)
        this.cartdata = res.data;
        this._CartService.cartcount.next(res.numOfCartItems)
      },
      error: (err) => console.log(err)
    });
  }

  updatecount(p_id: string, count: number): void {
    if (count > 1) {
      this._CartService.updatecartproductquantity(p_id, count).subscribe({
        next: (res) => {
          console.log(res)
          this.cartdata = res.data;
        },
        error: (err) => console.log(err)
      });
    }
  }

  clearcart(): void {
    this._CartService.clearcart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartdata = null;
        this._CartService.cartcount.next(0)
        
      },
      error: (err) => console.log(err)
    });
  }

}
