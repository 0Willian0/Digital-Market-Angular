import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { AppState, User } from "../../../config/store/app.state";
import { UserData } from "../../../model/UserData";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectUser } from "../../../config/store/app.selectors";

@Component({
    selector: 'app-userBalance',
    templateUrl: './userBalance.component.html',
    styleUrl: './userBalance.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class userBalanceComponent{
    user$: Observable<User | null>;
    balance: number = 0;
    userData: UserData | null = null; 

  constructor(private store: Store<{ app: AppState }>, private router: Router) {
    this.user$ = this.store.select(selectUser); 

    const json = localStorage.getItem('userKey');
    if (json) {
        this.userData = JSON.parse(json);
        this.balance = this.userData?.balance || 0;
    }
  }
}

