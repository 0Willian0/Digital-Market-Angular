import { Component, ViewEncapsulation } from "@angular/core";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../config/http/api.service";
import { Store } from "@ngrx/store";
import { AppState, User } from "../../../config/store/app.state";
import { selectUser } from "../../../config/store/app.selectors";
import { Observable } from "rxjs";
import { UserData } from "../../../model/UserData";
import { ProductData } from "../../../model/ProductData.model";
import { HistoryItemComponent } from "../HistoryItem/historyItem.component";
import { Price } from "../../../model/Price";

@Component({
    selector: 'app-historyProducts',
    templateUrl: './historyProducts.component.html',
    styleUrl: './historyProducts.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [pageTitleComponent,CommonModule, HistoryItemComponent],
})
export class HistoryProductsComponent{
    user$: Observable<User | null>;
    userData: UserData | null = null; 
    id: number = 0;
    products: ProductData[]=[]
    price: Price={}
    dateBuyed!: string;

    constructor(private store: Store<{ app: AppState }>, private apiService: ApiService, private route: ActivatedRoute,) {
        this.user$ = this.store.select(selectUser); 

        const json = localStorage.getItem('userKey');
        if (json) {
            this.userData = JSON.parse(json);
            this.id = this.userData?.id || 0;
        }
    }

    ngOnInit(): void {
      this.dateBuyed = this.route.snapshot.paramMap.get('dateBuyed')!
      this.getProduct() 
      this.getTotalPrice()
    }

    get formattedDate(): string {
        const date = new Date(this.dateBuyed);
        return date.toLocaleDateString('pt-BR'); 
    }

    getProduct() {
      this.apiService.getProductsHistory(this.formattedDate, this.id).subscribe({
        next: (products: ProductData[]) => {
          this.products = products; 
        },
        error: (err) => {
          console.error('Erro ao obter produtos:', err);
          this.products = [];  
        }
      });
    }

    getTotalPrice(){
      this.apiService.getTotalPriceHistory(this.formattedDate, this.id).subscribe({
        next: (price: Price)=>{
          this.price = price
        },
        error: (err)=>{
          console.log('Erro ao obter preco', err)
          this.price = {}
        }
      })
    }
}