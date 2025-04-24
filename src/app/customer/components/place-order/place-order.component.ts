import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  orderForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog

  ){}

  ngOnInit(){
    this.orderForm=this.fb.group({
      address:[null,[Validators.required]],
      orderDescription:[null],
    })
  }

  placeOrder(){
    //JSON.parse(localStorage.getItem('ecom-user'));
    this.customerService.placeOrder(this.orderForm.value).subscribe(res=>{
      if(res.id!=null){
        console.log('Order Placed Response:', res);
        //order placed, now start stripe Payment
        const paymentRequest={
          amount: res.amount,
          orderId: res.id,
          productName: "Order #"+res.id,
          customerEmail: this.getCustomerEmail() //|| 'test@example.com' //falback email if missing
        };
        this.customerService.createCheckoutSession(paymentRequest).subscribe((checkoutUrl: string)=>{
          window.location.href=checkoutUrl; //redirect to Stripe checkout
        });
        // this.snackBar.open("Order placed successfylly","Close",
        //   { duration: 500 });
        // this.router.navigateByUrl("/customer/my-orders");
       // this.closeForm();
      }else{
        this.snackBar.open("something went wrong","close",
          { duration: 5000})
      }
    })
  }
  closeForm(){
    this.dialog.closeAll();
  }
  getCustomerEmail(): string{
    const user=UserStorageService.getUser();
    return user?.email ?? '';
  }
}
