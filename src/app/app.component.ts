import { Component } from '@angular/core';

import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceWebAngular2025';

  isCustomerLoggedIn: boolean=UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean =UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){
    
  }

    ngOnInit():void{
      this.router.events.subscribe(event=>{
        this.isCustomerLoggedIn=UserStorageService.isCustomerLoggedIn();
        // console.log(`customer logged in is:${this.isCustomerLoggedIn}`);
        // console.log(`admin logged in is:${this.isAdminLoggedIn}`);
        this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
      })
    }
  
  logout(){
    UserStorageService.signout();
    this.router.navigateByUrl('login');
  }
}
