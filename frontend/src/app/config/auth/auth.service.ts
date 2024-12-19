import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setUser, toggleMenu } from '../store/app.actions';
import { catchError, of, tap } from 'rxjs';
import { userKey } from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private store: Store<{ app: AppState }>,
    private router: Router
  ) {}

  validateToken() {
    const json = localStorage.getItem('userKey')
    const userData = json ? JSON.parse(json) : null;
  
    if (!userData || !userData.token) {
      this.logout();
      return of(null);
    }
  
    return this.http.post<boolean>(`${this.baseApiUrl}/validateToken`, { token: userData.token }).pipe(
      tap((isValid) => {
        if (isValid) {
          this.store.dispatch(setUser({ user: userData }));
          if (window.innerWidth <= 768) {
            this.store.dispatch(toggleMenu({ isVisible: false }));
          }
        } else {
          this.logout();
        }
      }),
      catchError((error) => {
        console.error('Erro ao validar token:', error);
        this.logout();
        return of(null);
      })
    );
  }
  

  private logout() {
    localStorage.removeItem('userKey');
    this.store.dispatch(setUser({ user: null }));
    this.router.navigate(['/auth']);
  }

  restoreUser() {
    const json = localStorage.getItem('userKey');
    const userData = json ? JSON.parse(json) : null;
    if (userData) {
      this.store.dispatch(setUser({ user: userData }));
    }
  }
}
