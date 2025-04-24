import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/services/admin.service';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


    products: any[] =[];
    searchProductForm!:FormGroup;
  
    constructor(private customerService:CustomerService,
      private fb:FormBuilder,
      private snackBar:MatSnackBar,
    )
    {}
  
    ngOnInit(){
      this.getAllProducts();
      this.searchProductForm=this.fb.group({
        title:[null,[Validators.required]]
      })
    }
    getAllProducts(){
      this.products=[];
      this.customerService.getAllProducts().subscribe(res =>{
        res.forEach(element =>{
          element.processedImg='data:image/jpeg;base64,'+element.byteImg;
          this.products.push(element);
        });
        console.log(this.products);
      })
    }

    submitForm(){
      this.products=[];
      const title=this.searchProductForm.get('title')!.value;
      this.customerService.getAllProductsByName(title).subscribe(res =>{
        res.forEach(element =>{
          element.processedImg='data:image/jpeg;base64,'+element.byteImg;
          this.products.push(element);
        });
        console.log(this.products);
      })
    }
    addToCart(id:any){
      console.log(`user is is: ${UserStorageService.getUserId()}`)
      const userId=UserStorageService.getUserId();
      if(!userId){
        this.snackBar.open("user ID is missing", "close",
          { duration:5000, panelClass:'error-snackbar'}
        );
        return;
      }
      this.customerService.addToCart(id).subscribe(res =>{
        this.snackBar.open("product added to cart successfully","close",
          { duration: 5000})
      })
    }
} 
