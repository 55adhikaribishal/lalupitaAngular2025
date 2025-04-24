import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

  orderId: any;
  orderDetails:any;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ){}

  ngOnInit(){
      this.fetchOrderDetails();
    //this.launchConfetti();
    // this.snackBar.open('Payment Successful thank you.','Close',
    //   { duration: 4000}
    // );
    // setTimeout(()=>{
    //   this.router.navigateByUrl('customer/my_orders');
    // },400);
  }

  fetchOrderDetails(){
    //this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
      //this.orderDetails=res;
      // this.customerService.getOrderById(orderId).subscribe(order=>{
      //   this.orderDetails=order;
      //   console.log(order); //now we get address, description and all
      // })
      const orderId = this.route.snapshot.queryParams['orderId'];
    // if(orderId){
    //   this.orderId=orderId;
    //   this.customerService.confirmOrderPayment(orderId).subscribe(res=>{
    //     this.orderDetails=res;
    //     console.log('Payment Confirmation Response',res);
    //     // this.snackBar.open('Payment Successful and Order Confirmed!','Close',{ duration:4000 });
    //     // setTimeout(()=>{
    //     //   this.router.navigateByUrl('/customer/my_orders');
    //     // }, 4000);
    //   });
    // } else {
    //   this.router.navigateByUrl('/customer/dashboard');
    // }
    if (orderId) {
      this.orderId = orderId;
  
      this.customerService.confirmOrderPayment(+orderId).subscribe(
        (res) => {
          this.orderDetails = res;
        },
        (err) => {
          console.error('Payment confirmation failed', err);
          this.snackBar.open('Error confirming payment', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.router.navigateByUrl('/customer/dashboard');
    }
  }

  goToMyOrders(){
    this.router.navigateByUrl('/customer/my_orders');
  }

  launchConfetti(){
  //  confetti.create(document.getElementById('confetti-canvas'),{
  //     resize:true,
  //     useWorker:true
  //   })({
  //     particleCount:200,
  //     spread:70,
  //     origin: { y:0.6 }
  //   });
  }
}
