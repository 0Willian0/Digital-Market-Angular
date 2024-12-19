import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { MenuComponent } from './components/templates/menu/menu.component';
import { ContentComponent } from './components/templates/content/content.component';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './config/store/app.reducer';
import { selectIsMenuVisible, selectUser } from './config/store/app.selectors';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './config/auth/auth.service';
import { User } from './config/store/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isMenuVisible$: Observable<boolean>;
  user$: Observable<User | null>;
  validatingToken = false;

  constructor(private store: Store<{ app: AppState }>, private authService: AuthService) {
    this.isMenuVisible$ = this.store.select(selectIsMenuVisible);
    this.user$ = this.store.select(selectUser);

    this.authService.restoreUser();
  }

  ngOnInit() {
    this.authService.restoreUser();
    this.validateToken();
  }

  shouldHide(): boolean {
    const json = localStorage.getItem('userKey');
    const userData = json ? JSON.parse(json) : null;
  
    return !userData?.name;
  }
  

  validateToken() {
    this.validatingToken = true;
    this.authService.validateToken().subscribe({
      next: () => {
        this.validatingToken = false;
      },
      error: (err) => {
        console.error('Erro ao validar token:', err);
        this.validatingToken = false;
      },
    });
  }
}
