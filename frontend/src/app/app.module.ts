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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MenuComponent,
    userDropdownComponent,
    adminPageComponent,
    userAdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({ app: appReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule, // Necessário para animações
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Posicionamento das notificações
      timeOut: 3000, // Tempo de exibição em milissegundos
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
