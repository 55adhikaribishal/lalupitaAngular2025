import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {

  productForm:FormGroup;
  listOfCategories:any=[];
  selectedFile:File| null;
  imagePreview: string |ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService:AdminService
  ){}

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    const maxSizeInMB=10;
    if(this.selectedFile && this.selectedFile.size >maxSizeInMB *1024*1024){
      this.snackBar.open(`Image must be smaller than ${maxSizeInMB}MB`,'Close',
        { duration:5000});
        return;
    }
    this.previewImage();
  }

  previewImage(){
    const reader= new FileReader();
    reader.onload=() =>{
      this.imagePreview=reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void{
    this.productForm=this.fb.group({
      categoryId: [null,[Validators.required]],
      name:[null,[Validators.required]],
      price:[null,[Validators.required]],
      description:[null,[Validators.required]],
    });

    this.getAllCategories();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);
  
      this.adminService.addProduct(formData).subscribe(
        (res) => {
          if (res.id != null) {
            this.snackBar.open('Product Posted Successfully!', 'Close', { duration: 5000 });
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
          }
        },
        (error) => {
          if (error.status === 403) {
            this.snackBar.open('Session expired. Please login again.', 'Close', { duration: 5000 });
            UserStorageService.signout();
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open('Failed to add product.', 'Close', { duration: 5000 });
          }
        }
      );
  
    } else {
      // 🔥 Keep this else here exactly like you wrote!
      for (const i in this.productForm.controls) {
        if (this.productForm.controls.hasOwnProperty(i)) {
          this.productForm.controls[i].markAsDirty();
          this.productForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }
  
}
