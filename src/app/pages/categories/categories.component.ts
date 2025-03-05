import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
    private readonly _CategoriesService = inject(CategoriesService )
    Categoriesdata !: ICategory[];
    Categorysub!: Subscription

    ngOnInit(): void {
      this._NgxSpinnerService.show()
      this.Categorysub = this._CategoriesService.getallcategories().subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide()
          this.Categoriesdata = res.data;
          console.log(this.Categoriesdata)
  
        }
      })
    }

}
