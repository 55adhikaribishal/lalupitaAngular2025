import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  myOrder:any;
  constructor(private customerService: CustomerService)
  {}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrderByUserId().subscribe(res=>{
      this.myOrder=res;
    })
  }
}
