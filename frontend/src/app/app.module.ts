import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component'
import { MenuComponent } from './components/templates/menu/menu.component';
import { ContentComponent } from './components/templates/content/content.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './config/store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { userDropdownComponent } from './components/templates/userDropdown/userDropdown.component';
import { AppRoutingModule } from './app.routes';
import { adminPageComponent } from './components/admin/adminPage/adminPage.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { userAdminComponent } from './components/admin/userAdmin/userAdmin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { productsAdminComponent } from './components/admin/productAdmin/productsAdmin.component';
import { FormsModule } from '@angular/forms';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { productByCategoryComponent } from './components/product/ProductByCategory/productByCategory.component';
import { ProductItemComponent } from './components/product/ProductItem/productItem.component';
import { AllProductsComponent } from './components/home/AllProducts/allProducts.component';
import { AuthComponent } from './components/auth/auth.component';
import {localStorageSync} from 'ngrx-store-localstorage'
import { MetaReducer} from '@ngrx/store';
import { CartComponent } from './components/cart/Cart/cart.component';
import { CartItemComponent } from './components/cart/CartItem/cartItem.component';
import { HistoryDataComponent } from './components/history/HistoryData/historyData.component';
import { HistoryComponent } from './components/history/History/history.component';
import { HistoryItemComponent } from './components/history/HistoryItem/historyItem.component';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ 
    keys: [{ app: ['user', 'isMenuVisible'] }], 
    rehydrate: true 
  })(reducer);
}


export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MenuComponent,
    userDropdownComponent,
    adminPageComponent,
    userAdminComponent,
    productsAdminComponent,
    productByCategoryComponent,
    ProductItemComponent,
    AllProductsComponent,
    AuthComponent,
    CartComponent,
    CartItemComponent,
    HistoryDataComponent,
    HistoryComponent,
    HistoryItemComponent
  ],
  imports: [
    FormsModule,
    NzIconModule,
    NzInputModule,
    NzTreeModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({ app: appReducer}, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 3000, 
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
