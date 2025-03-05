import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/products/i-product';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule, SearchPipe, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {



  productsdata !: IProduct[];
  Categoriesdata !: ICategory[];
  productssub!: Subscription
  Categorysub!: Subscription
  searchvalue: string = '';

  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService, private _CartService: CartService, private toaster: ToastrService, private _WishlistService: WishlistService) { }

  private readonly _NgxSpinnerService = inject(NgxSpinnerService)


  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this.Categorysub = this._CategoriesService.getallcategories().subscribe({
      next: (res) => {
        this.Categoriesdata = res.data;
        this._NgxSpinnerService.hide()
        
      },
      
    })



    this.productssub = this._ProductsService.getallproducts().subscribe({
      next: (res) => {
        this.productsdata = res.data
        console.log(this.productsdata);
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
      },
      error: (err) => {
        console.log(err)
        this.toaster.error('Product not added to cart', "freshcart",
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

  ngOnDestroy(): void {
    this.productssub?.unsubscribe()
    this.Categorysub?.unsubscribe()
  }


  mainslideroptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  slideroptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280: {
        items: 6
      }
    },
    nav: false
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
        this.toaster.error('Product not added to wishlist', "freshcart",
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
