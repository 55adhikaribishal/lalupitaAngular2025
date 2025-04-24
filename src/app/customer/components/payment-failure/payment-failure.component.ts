import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.scss']
})
export class PaymentFailureComponent {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.snackBar.open('Payment failed or cancelled.','Close', { duration:4000});
    setTimeout(()=>{
      this.router.navigateByUrl('/customer/cart');
    },4000);
  }
}
