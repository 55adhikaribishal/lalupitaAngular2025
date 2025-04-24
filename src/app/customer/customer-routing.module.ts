import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my_orders', component: MyOrdersComponent },
  { path: 'ordered-products/:orderId', component: ViewOrderedProductsComponent },
  { path: 'review/:productId', component: ReviewOrderedProductComponent },
  { path: 'product/:productId', component: ViewProductDetailsComponent },
  { path: 'wishlist', component: ViewWishlistComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failure', component: PaymentFailureComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
