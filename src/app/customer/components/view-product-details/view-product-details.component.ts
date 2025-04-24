import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent {
  productId: number =this.activatedRoute.snapshot.params["productId"];
  product: any;
  FAQS: any[] =[];
  reviews: any[] =[];

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    this.getProductDetailsById();
  }
  getProductDetailsById(){
    this.customerService.getProductDetailsById(this.productId).subscribe(res=>{
      this.product=res.productDto;
      this.product.processedImg='data:image/png;base64,'+res.productDto.byteImg;

      this.FAQS=res.faqDtoList;

      res.reviewDtoList.forEach(element =>{
        element.processedImg ='data:image/png;base64,'+ element.returnedImg;
        this.reviews.push(element);
      })
    })
  }

  addToWishList(){
    const wishListDto = {
      userId: UserStorageService.getUserId(), // <-- add () to actually call the method
      productId: this.productId,
    };
  
    this.customerService.addProductToWishList(wishListDto).subscribe(res => {
      if(res?.id != null){
        this.snackbar.open('Product Added to Favorites Successfully!', 'Close', {
          duration: 5000
        });
      } else {
        this.snackbar.open('Something went wrong!', 'ERROR', {
          duration: 5000
        });
      }
    });
  }
  
}
