import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppState, initialState } from "../../../config/store/app.reducer";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../config/store/app.selectors";
import { ViewEncapsulation } from "@angular/core";
import { RouterModule } from '@angular/router';
import { UserData } from "../../../model/UserData"; 
import { User } from "../../../config/store/app.state";
import { Router } from "@angular/router";
import { setUser } from "../../../config/store/app.actions";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-userDropdown',
    standalone: true,
    imports:[RouterModule, CommonModule],
    templateUrl: './userDropdown.component.html',
    styleUrl: './userDropdown.component.css',
    encapsulation: ViewEncapsulation.None
})
export class userDropdownComponent{
    user$: Observable<User | null>;
    name: string = '';
    imageUrl: string = '';
    userData: UserData | null = null; 

  constructor(private store: Store<{ app: AppState }>, private router: Router) {
    this.user$ = this.store.select(selectUser); 

    const json = localStorage.getItem('userKey');
    if (json) {
        this.userData = JSON.parse(json);
        this.name = this.userData?.name || '';
        this.imageUrl = this.userData?.imageUrl || ''
    }
  }

    logout() {
        localStorage.removeItem("userKey");
        this.store.dispatch(setUser({ user: null }));      
        this.router.navigate(['/auth']);
    }
}
