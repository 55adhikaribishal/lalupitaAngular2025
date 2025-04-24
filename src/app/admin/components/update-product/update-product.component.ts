import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {

  productId=this.activatedRoute.snapshot.params['productId'];
  productForm: FormGroup;
  listOfCategories: [{id:number,name:string}];

  existingImage: string | null =null;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null =null;
  imageChanged=false;

  constructor(private fb: FormBuilder,
    private router:Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit(){
    this.productForm=this.fb.group({
      name:[null,[Validators.required]],
      categoryId:[null,[Validators.required]],
      price:[null,[Validators.required]],
      description:[null,[Validators.required]]
    })
    this.getProductById();
    this.getAllCategories();
  }

  onFileSelected(event: any){
    this.selectedFile=event.target.files[0];
    this.previewImage();

    this.imageChanged=true;
    this.existingImage=null;
  }

  previewImage(){
    const reader=new FileReader();
    reader.onload= () =>{
      this.imagePreview=reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res=>{
      this.productForm.patchValue(res);
      this.existingImage='data:image/jpeg;base64,'+res.byteImg;
    })
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }
 
  updateProduct(): void{
    if(this.productForm.valid){
      const formData: FormData= new FormData();

      if(this.imageChanged && this.selectedFile){
        formData.append('img',this.selectedFile);
      }

      
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('price',this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId,formData).subscribe((res) =>{
        if(res.id !=null){
          this.snackbar.open('Product Updated Successfuly!', 'Close', {
            duration:5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackbar.open(res.message, 'ERROR', {
            duration:5000
          });
        }
      })

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
