import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './app/config/store/app.reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/config/auth/auth.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'APP_CONFIG', useValue: appConfig },
    provideRouter(routes),
    provideStore({ app: appReducer }),
    provideStoreDevtools(),
    provideEffects([]), provideAnimationsAsync(),
    provideAnimations(), 
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
      })
    ),
    provideHttpClient(
      withInterceptors([authInterceptor]) 
    ),
    importProvidersFrom(ReactiveFormsModule), provideNzI18n(pt_BR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()
  ],
})
.catch((err) => console.error(err));
