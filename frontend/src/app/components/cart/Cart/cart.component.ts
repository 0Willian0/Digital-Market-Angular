import { Component, ViewEncapsulation } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { AppState, User } from "../../../config/store/app.state";
import { UserData } from "../../../model/UserData";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../config/store/app.selectors";
import { Product } from "../../../model/Product.model";
import { ApiService } from "../../../config/http/api.service";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "../CartItem/cartItem.component";
import { ActivatedRoute } from "@angular/router";
import { Price } from "../../../model/Price";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [pageTitleComponent, CartItemComponent, CommonModule]
})
export class CartComponent{
    user$: Observable<User | null>;
    id: number = 0;
    userData: UserData | null = null; 
    products: Product[]=[]
    users: UserData[]=[]
    price: Price={}
    user: UserData={}

    constructor(private store: Store<{ app: AppState }>, private apiService: ApiService, private route: ActivatedRoute,) {
        this.user$ = this.store.select(selectUser); 

        const json = localStorage.getItem('userKey');
        if (json) {
            this.userData = JSON.parse(json);
            this.id = this.userData?.id || 0;
        }
    }

    ngOnInit(): void {
      this.getProduct()
      this.getTotalPrice()
      this.getUserById()
    }
  
    getProduct() {
        this.apiService.getProductsCart(this.id).subscribe({
          next: (products: Product[]) => {
            this.products = products; 
          },
          error: (err) => {
            console.error('Erro ao obter produtos:', err);
            this.products = [];  
          }
        });
    }

    getTotalPrice() {
      this.apiService.getTotalPrice(this.id).subscribe({
        next: (price: Price) => {
          this.price = price
        },
        error: (err) => {
          console.error('Erro ao obter Preço:', err);
          this.price = {}
        }
      });
    }

    getUserById(){
      this.apiService.getUserById(this.id).subscribe({
        next: (user: UserData)=>{
          this.user = user
        },
        error: (err)=>{
          console.log('Erro ao obter Usuario:', err)
          this.user = {}
        }
      })
    }

    async pay() {
      if (this.user?.balance !== undefined && this.price?.totalPrice !== undefined) {
        if (this.user.balance > this.price.totalPrice) {
          const newBalance = this.user.balance - this.price.totalPrice;

          try {
            await firstValueFrom(this.apiService.putBalance(newBalance, this.id));

            await firstValueFrom(this.apiService.getHistoryAndUpdate(this.id));

            await firstValueFrom(this.apiService.deleteCart(this.id));

            console.log('Pagamento realizado com sucesso');
          } catch (err) {
            console.error('Erro ao processar pagamento:', err);
          }
        } else {
          console.log('Saldo insuficiente');
        }
      }
    }

}