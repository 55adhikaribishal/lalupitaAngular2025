import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent {

  orderId: any = this.activatedRoute.snapshot.params['orderId'];
  orderedProductDetailsList = [];
  totalAmount: any;

  constructor (private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }


  ngOnInit() {
    this.getOrderedProductsDetailsByOrderId();
  }
  getOrderedProductsDetailsByOrderId() {
    //   this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
    //     if(res.productDtoList && res.productDtoList.length >0){}
    //     res.productDtoList.forEach(element =>{
    //       element.processedImg='data:image/jpeg;base64,'+ element.byteImg;
    //       this.orderedProductDetailsList.push(element);
    //     });
    //     this.totalAmount=res.orderAmount;
    //   })
    // new code from hereee
    this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
      if (res.productDtoList && res.productDtoList.length > 0) {
        this.orderedProductDetailsList = res.productDtoList.map(element => {
          return {
            ...element,
            processedImg: 'data:image/jpeg;base64,' + element.byteImg
          };
        });
      }
      this.totalAmount = res.orderAmount;
    })

  }
}
