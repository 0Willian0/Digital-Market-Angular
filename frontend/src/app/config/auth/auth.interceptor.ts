import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { AppState } from '../store/app.state'; // Caminho correto para o estado da aplicação


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const store = inject(Store<{ app: AppState }>);

  return store.select(state => state.app.user?.token).pipe(
    take(1), 
    switchMap(token => {

      if (token) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq); 
      }
      return next(req); 
    })
  );
};
