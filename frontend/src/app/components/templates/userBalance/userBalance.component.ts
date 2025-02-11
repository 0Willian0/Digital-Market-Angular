import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { AppState, User } from "../../../config/store/app.state";
import { UserData } from "../../../model/UserData";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectUser } from "../../../config/store/app.selectors";
import { ApiService } from "../../../config/http/api.service";
import { Balance } from "../../../model/Balance.model";

@Component({
    selector: 'app-userBalance',
    templateUrl: './userBalance.component.html',
    styleUrl: './userBalance.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class userBalanceComponent{
    user$: Observable<User | null>
    balance: Balance={}
    userData: UserData | null = null
    id: number = 0

  constructor(private store: Store<{ app: AppState }>, private router: Router,private apiService: ApiService) {
    this.user$ = this.store.select(selectUser); 

    const json = localStorage.getItem('userKey');
    if (json) {
        this.userData = JSON.parse(json);
        this.id = this.userData?.id || 0;
    }
  }
  
  ngOnInit(){
    this.getBalance()
  }
  
  getBalance(){
    this.apiService.getBalance(this.id).subscribe({
            next: (balance: Balance)=>{
              this.balance = balance
            },
            error: (err)=>{
              console.log('Erro ao obter preco', err)
              this.balance = {}
            }
          })
  }
}

