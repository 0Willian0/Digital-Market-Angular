import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminPageComponent } from './components/admin/adminPage/adminPage.component';
import { homeComponent } from './components/home/Home/home.component';
import { productByCategoryComponent } from './components/product/ProductByCategory/productByCategory.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: homeComponent },
  { path: 'admin', component: adminPageComponent },
  { path: 'categories/:id/products', component: productByCategoryComponent},
  { path:'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
