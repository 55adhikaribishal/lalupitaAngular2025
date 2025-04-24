import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';


const BASIC_URL="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

   getAllProducts(): Observable<any>{
      return this.http.get(BASIC_URL+'api/customer/products',{
        headers:this.createAuthorizationHeader()
      })
    }
  
    getAllProductsByName(name: any): Observable<any>{
      return this.http.get(BASIC_URL+`api/customer/search/${name}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    addToCart(productId: any): Observable<any>{
      const cartDto={
        productId: productId,
        userId: UserStorageService.getUserId()
      }
      
      return this.http.post(BASIC_URL+`api/customer/cart`,cartDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    increaseProductQuantity(productId: any): Observable<any>{
      const cartDto={
        productId: productId,
        userId: UserStorageService.getUserId()
      }
      
      return this.http.post(BASIC_URL+`api/customer/addition`,cartDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    decreaseProductQuantity(productId: any): Observable<any>{
      const cartDto={
        productId: productId,
        userId: UserStorageService.getUserId()
      }
      
      return this.http.post(BASIC_URL+`api/customer/deduction`,cartDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    getCartByUserId(): Observable<any>{
      const userId= UserStorageService.getUserId();
      
      return this.http.get(BASIC_URL+`api/customer/cart/${userId}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    applyCoupon(code:any): Observable<any>{
      const userId= UserStorageService.getUserId();
      
      console.log(BASIC_URL+`api/customer/coupon/${userId}/${code}`);
      return this.http.get(BASIC_URL+`api/customer/coupon/${userId}/${code}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    placeOrder(orderDto:any): Observable<any>{
      orderDto.userId= UserStorageService.getUserId();
      console.log(`order dto details are: ${orderDto.toString()}`)
 
      return this.http.post(BASIC_URL+`api/customer/placeOrder`,orderDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    getOrderByUserId(): Observable<any>{
      const userId= UserStorageService.getUserId();
 
      return this.http.get(BASIC_URL+`api/customer/myOrders/${userId}`,{
        headers:this.createAuthorizationHeader()
      })
    }
    getOrderById(orderId: number): Observable<any>{
      return this.http.get(BASIC_URL+`api/customer/order/${orderId}`,{
        headers:this.createAuthorizationHeader()
      });
    }

    getOrderedProducts(orderId: number): Observable<any>{
      const userId= UserStorageService.getUserId();
 
      return this.http.get(BASIC_URL+`api/customer/ordered-products/${orderId}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    getProductDetailsById(productId: number): Observable<any>{
      
      return this.http.get(BASIC_URL+`api/customer/product/${productId}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    giveReview(reviewDto: any): Observable<any>{
 
      return this.http.post(BASIC_URL+`api/customer/review`,reviewDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    addProductToWishList(wishlistDto: any): Observable<any>{
      return this.http.post(BASIC_URL+`api/customer/wishlist`,wishlistDto,{
        headers:this.createAuthorizationHeader()
      })
    }

    getWishListByUserId(): Observable<any>{
      const userId=UserStorageService.getUserId();
      return this.http.get(BASIC_URL+`api/customer/wishlist/${userId}`,{
        headers:this.createAuthorizationHeader()
      })
    }
    confirmOrderPayment(orderId: number): Observable<any>{
      // return this.http.get(BASIC_URL+`api/customer/confirm-payment/${orderId}`,
      //   { headers: this.createAuthorizationHeader(),
      //    // responseType:'text' as 'json' //this tells Angular to treat plain text as the response
      //   });
      return this.http.get(BASIC_URL+`api/customer/confirm-payment`, {
        headers: this.createAuthorizationHeader(),
        params: { orderId: orderId.toString() }
      });
    }
    createCheckoutSession(paymentRequest: any) :Observable<any> {
      return this.http.post(BASIC_URL+'api/customer/payment/create-checkout-session', paymentRequest,{
        headers: this.createAuthorizationHeader(),
        responseType:'text' //Important because stripe URL is returned as plain text
      });
    }

    getCustomerProfile():Observable<any>{
      // return this.http.get(BASIC_URL+'api/customer/profile',{
      //   headers: this.createAuthorizationHeader()
      // });
      return this.http.get(BASIC_URL+'api/user/profile',{
        headers: this.createAuthorizationHeader()
      });
    }
    updateUserProfile(formData: FormData): Observable<any>{
      return this.http.put(BASIC_URL+'api/user/update-profile',formData,{
        headers: this.createAuthorizationHeader()
      })
    }
     private createAuthorizationHeader(): HttpHeaders{
        return new HttpHeaders().set(
          'Authorization','Bearer '+UserStorageService.getToken()
        )
      }
    
}
