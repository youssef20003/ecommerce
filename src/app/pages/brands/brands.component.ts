import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brand/brands.service';
import { Ibrand } from '../../core/interfaces/brands/ibrand';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  branddeatails !: Ibrand[]

  private readonly _BrandsService =  inject(BrandsService)


  private readonly _ngxSpinnerService = inject(NgxSpinnerService)

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    
    this._BrandsService.getallbrands().subscribe({

      next:(res)=>{
        this._NgxSpinnerService.hide()
        this.branddeatails = res.data
        console.log(this.branddeatails)

      }
    })
    
  }


  

}
