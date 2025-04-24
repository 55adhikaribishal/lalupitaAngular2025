import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileData: any;
  profileForm: FormGroup;
  selectedFile: File | null =null;
  imagePreview: string | ArrayBuffer | null=null;

  constructor(private customerSevice: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.profileForm=this.fb.group({
      name:[null,[Validators.required]],
      phoneNumber:[null, [Validators.required]],
      email:[{value:'', disabled:true }]
    })
    this.loadProfile();
  }

  loadProfile(){
    this.customerSevice.getCustomerProfile().subscribe(
      (res) => {
        this.profileForm.patchValue({
          name: res.name,
          phoneNumber: res.phoneNumber,
          email: res.email
        });
  
        console.log('Profile data:', res);
        if (res.returnedImg) {
          this.imagePreview = 'data:image/jpeg;base64,' + res.returnedImg;
        }
      },
      (err) => {
        console.error('Error fetching profile', err);
      }
    );
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    const reader=new FileReader();
    reader.onload=() =>{
      this.imagePreview=reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  updateProfile(){
    if (this.profileForm.valid) {
      const formData = new FormData();
      
      const profilePayload = {
        name: this.profileForm.get('name')?.value,
        phoneNumber: this.profileForm.get('phoneNumber')?.value
      };
  
      formData.append('update-profile', new Blob(
        [JSON.stringify(profilePayload)],
        { type: 'application/json' }
      ));
  
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
  
      this.customerSevice.updateUserProfile(formData).subscribe(
        res => {
          this.snackBar.open('Profile updated!', 'Close', { duration: 3000 });
          this.loadProfile();
        },
        err => {
          console.error('Update failed', err);
          this.snackBar.open('Update failed', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
