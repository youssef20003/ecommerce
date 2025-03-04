import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {


  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly PaymentService = inject(PaymentService);
  detailsform = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });

  cartid!: string;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartid = params.get('c_id')!;
      }

    });
  }

  checkout(): void {
    if (this.detailsform.valid) {
      this.PaymentService.checkoutsession(this.cartid, this.detailsform.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status == 'success') {
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => { 
          console.log(err) 
          
        }
      })

    }

  }
}