import { subscribe } from 'diagnostics_channel';
import { Product } from './../../../core/interfaces/cart/icart';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../../core/interfaces/products/i-product';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  constructor(private toaster: ToastrService){}

  Products !: IProduct[]

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._WishlistService.Getloggeduserwishlist().subscribe({
      next:(res)=>{
        this.Products = res.data
        console.log(this.Products)
        this._NgxSpinnerService.hide()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  removewishlistitem(p_id : string):void{
    this._WishlistService.Removeproductfromwishlistt(p_id).subscribe({
      next:(res)=>{
        console.log(res)
        this.Products = res.data
      }
    })
    
  }

  addtocart(p_id: string): void {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        this.toaster.success('Product added to cart', "freshcart",
          {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
          })
        console.log(res.numOfCartItems)
        this._CartService.cartcount.next(res.numOfCartItems)
        console.log(res.numOfCartItems)
        this._WishlistService.Removeproductfromwishlistt(p_id).subscribe({
          next:(res)=>{
            console.log(res)
          }
          
        })
        this.Products = res.data

      },
      error: (err) => {
        console.log(err)
        this.toaster.error('Product not added to cart',  "freshcart",
          {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
            toastClass: 'tpos ',
            positionClass: 'toast-top-right'

          })
      }
    });

  }

}
