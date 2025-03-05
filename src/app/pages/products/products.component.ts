import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { IProduct } from '../../core/interfaces/products/i-product';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [FormsModule, SearchPipe, RouterLink , CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  productsdata !: IProduct[];
  productssub!: Subscription
  Categorysub!: Subscription
  searchvalue: string = '';

  constructor(private _ProductsService: ProductsService, private _CartService: CartService , private toaster: ToastrService , private _WishlistService : WishlistService) { }
  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this.productssub = this._ProductsService.getallproducts().subscribe({
      next: (res) => {
        this.productsdata = res.data
        console.log(this.productsdata);
        this._NgxSpinnerService.hide()
      }
    })

  }
  ngOnDestroy(): void {
    this.productssub?.unsubscribe()
    this.Categorysub?.unsubscribe()
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
  addtowishlist(p_id: string): void {
    this._WishlistService.Addproducttowishlist(p_id).subscribe({
      next: (res) => {
        this.toaster.success('Product added to wishlist', "freshcart",
          {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',

          })
        console.log(res.numOfCartItems)
        this._CartService.cartcount.next(res.numOfCartItems)
        console.log(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
        this.toaster.error('Product not added to wishlist',  "freshcart",
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
