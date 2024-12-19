import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Product } from "../../../model/Product.model";
import { ApiService } from "../../../config/http/api.service";
import { catchError, Observable, of } from "rxjs";
import { NotificationService } from "../../../config/msgs/notification.service";
import { UserData } from "../../../model/UserData";
import { AppState, User } from "../../../config/store/app.state";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectUser } from "../../../config/store/app.selectors";

@Component({
    selector: 'app-productItem',
    templateUrl: './productItem.component.html',
    styleUrl: './productItem.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class ProductItemComponent {
    @Input() product!: Product
    user$: Observable<User | null>;
    id: number = 0;
    userData: UserData | null = null; 

    constructor(private store: Store<{ app: AppState }>, private router: Router, 
        private apiService: ApiService, private notificationService: NotificationService) {

        this.user$ = this.store.select(selectUser); 

        const json = localStorage.getItem('userKey');
        if (json) {
            this.userData = JSON.parse(json);
            this.id = this.userData?.id || 0;
        }
    }
    
    save() {    

        if (!this.id || !this.product?.id) {
            this.notificationService.notifyError('ID do usuário ou do produto está ausente.');
            return;
        }

        this.apiService.saveCart(this.id, this.product.id).pipe(
            catchError((error) => {
                this.notificationService.notifyError('Erro ao salvar produto.');
                return of(null);
            })
        ).subscribe(response => {
            if (response?.success) {
                this.notificationService.notifySuccess('Produto salvo com sucesso!');
            } else {
                this.notificationService.notifyError('Falha ao salvar a produto.');
            }
        });
    }
}