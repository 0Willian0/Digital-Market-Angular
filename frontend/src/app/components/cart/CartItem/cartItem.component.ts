import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Product } from "../../../model/Product.model";
import { AppState, User } from "../../../config/store/app.state";
import { catchError, Observable, of } from "rxjs";
import { UserData } from "../../../model/UserData";
import { Store } from "@ngrx/store";
import { NotificationService } from "../../../config/msgs/notification.service";
import { ApiService } from "../../../config/http/api.service";
import { selectUser } from "../../../config/store/app.selectors";


@Component({
    selector: 'app-cartItem',
    templateUrl: './cartItem.component.html',
    styleUrl: './cartItem.component.css',
    encapsulation: ViewEncapsulation. None,
    standalone: true
})
export class CartItemComponent{
    @Input() product!: Product
    user$: Observable<User | null>;
    id: number = 0;
    userData: UserData | null = null; 

    constructor(private store: Store<{ app: AppState }>,
        private apiService: ApiService, private notificationService: NotificationService) {

        this.user$ = this.store.select(selectUser); 

        const json = localStorage.getItem('userKey');
        if (json) {
            this.userData = JSON.parse(json);
            this.id = this.userData?.id || 0;
        }
    }
    
    remove() {    
        if (!this.id || !this.product?.id) {
            this.notificationService.notifyError('ID do usuário ou do produto está ausente.');
            return;
        }

        this.apiService.deleteProductCart(this.id, this.product.id).pipe(
            catchError((error) => {
                this.notificationService.notifyError('Erro ao salvar produto.');
                return of(null);
            })
        ).subscribe(response => {
            this.notificationService.notifySuccess('Produto removida com sucesso!');
        });
    }
}