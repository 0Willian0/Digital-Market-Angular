// auth.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../config/store/app.state';
import { setUser } from '../../config/store/app.actions';
import { NotificationService } from '../../config/msgs/notification.service';
import { firstValueFrom } from 'rxjs'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true, // Este componente será independente
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule], // Aqui você não precisa do NgModule, apenas o que é necessário
})
export class AuthComponent {
  private baseApiUrl = 'http://localhost:3001';
  showSignup = false;
  userData: any = {}; // Use interfaces se possível para tipar corretamente

  constructor(
    private store: Store<{ app: AppState }>, 
    private router: Router, 
    private http: HttpClient, 
    private notificationService: NotificationService
  ) {}

  async signin() {
    try {
      const res = await firstValueFrom(
        this.http.post<any>(`${this.baseApiUrl}/signin`, this.userData)
      );
  
      this.store.dispatch(setUser({ user: res }));

      localStorage.setItem('userKey', JSON.stringify(res));
  
      this.router.navigate(['/']);
    } catch (error) {
      this.notificationService.notifyError('Erro ao fazer login');
    }
  }
  

  async signup() {
    try {
      await firstValueFrom(this.http.post(`${this.baseApiUrl}/signup`, this.userData));
      this.notificationService.notifySuccess('Cadastro realizado com sucesso!');
      this.userData = {};
      this.showSignup = false; 
    } catch (error) {
      this.notificationService.notifyError('Erro ao cadastrar');
    }
  }
  toggleSignup() {
    this.showSignup = !this.showSignup;
  }
}
