import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component'
import { MenuComponent } from './components/templates/menu/menu.component';
import { ContentComponent } from './components/templates/content/content.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './config/store/app.reducer';
import { selectIsMenuVisible } from './config/store/app.selectors';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    MatCardModule,
    MatTabsModule,
    RouterOutlet, 
    HeaderComponent,
    FooterComponent, 
    MenuComponent, 
    ContentComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  isMenuVisible$: Observable<boolean>

  constructor(private store: Store<{ app: AppState }>) {
    this.isMenuVisible$ = this.store.select(selectIsMenuVisible);
  }
}
