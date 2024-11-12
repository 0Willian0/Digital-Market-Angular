import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminPageComponent } from './components/admin/adminPage/adminPage.component';
import { homeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: homeComponent },
  { path: 'admin', component: adminPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
