import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleMenu } from '../../../config/store/app.actions';
import { AppState } from '../../../config/store/app.reducer';
import { selectIsMenuVisible } from '../../../config/store/app.selectors';
import { userDropdownComponent } from '../userDropdown/userDropdown.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [userDropdownComponent, RouterModule],
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent{
  @Input() title: string = ''; 
  isMenuVisible$: Observable<boolean>; 
  icon: string = ''; 


  constructor(private store: Store<{ app: AppState }>) {
    this.isMenuVisible$ = this.store.select(selectIsMenuVisible);

    this.isMenuVisible$.subscribe(isVisible => {
      this.icon = isVisible ? 'fa-angle-left' : 'fa-angle-down'
    });
  }

  handleToggleMenu() {
    this.store.dispatch(toggleMenu({isVisible:undefined}));
  }
}
