import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/products/i-product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  imports: [CarouselModule ],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit {
  constructor(private _CartService : CartService, private toaster: ToastrService) { }


  addtocart(): void {
    this._CartService.AddProductToCart(this.productID).subscribe({
      next: (res) => {

        this.toaster.success('Product added to cart', "freshcart",
          {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',

          })
        
        console.log(res)
      },
      error: (err) =>{ console.log(err)
        this.toaster.error('Product added to cart', "freshcart",
          {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',

          })
        

      }
    });

  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      
    },
    nav: false
  }

  productID !: string
  productdetails !: IProduct

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({

      next: (param) => {
        this.productID = param.get('id')!;

      }

    })
    this._ProductsService.getspecificproduct(this.productID).subscribe({
      next: (res) => {
        this.productdetails = res.data ; 
        console.log(this.productdetails);
      }

    }
    )

  }
}
