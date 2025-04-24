import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.scss']
})
export class ReviewOrderedProductComponent {

  productId: number= this.activatedRoute.snapshot.params["productId"];
  reviewForm !: FormGroup;

  selectedFile: File | null;
  imagePreview: string |ArrayBuffer| null;

  constructor(private fb: FormBuilder,
    private snackbar:MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private userStorageService: UserStorageService,
  ){}

  ngOnInit(){
    this.reviewForm=this.fb.group({
      rating:[null,[Validators.required]],
      description:[null,[Validators.required]],
    })
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader= new FileReader();
    reader.onload=() =>{
      this.imagePreview= reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(){
    const formData: FormData= new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);

    this.customerService.giveReview(formData).subscribe(res=>{
      this.snackbar.open('Review Posted Successfully!','Close',{
        duration: 5000
      });
      this.router.navigateByUrl('/customer/my_orders');
    }, error=>{
      this.snackbar.open("Something went wrong while giving review", 'ERROR',{
        duration:5000
      });
    })
  }
}
