import { Component, ViewEncapsulation } from "@angular/core";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { Observable } from "rxjs";
import { selectUser } from "../../../config/store/app.selectors";
import { Store } from "@ngrx/store";
import { AppState, User } from "../../../config/store/app.state";
import { ApiService } from "../../../config/http/api.service";
import { ActivatedRoute } from "@angular/router";
import { UserData } from "../../../model/UserData";
import { History } from "../../../model/HistoryData.model";
import { HistoryDataComponent } from "../HistoryData/historyData.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrl: './history.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, pageTitleComponent, HistoryDataComponent]
})
export class HistoryComponent{
    user$: Observable<User | null>;
    userData: UserData | null = null; 
    id: number = 0;
    histories: History[]=[]

    constructor(private store: Store<{ app: AppState }>, private apiService: ApiService, private route: ActivatedRoute,) {
            this.user$ = this.store.select(selectUser); 
    
            const json = localStorage.getItem('userKey');
            if (json) {
                this.userData = JSON.parse(json);
                this.id = this.userData?.id || 0;
            }
    }
    ngOnInit(): void {
        this.getHistory()
    }

    getHistory() {
        this.apiService.getHistory(this.id).subscribe({
            next: (histories: History[]) => {
            this.histories = histories; 
            },
            error: (err) => {
            console.error('Erro ao obter o Historico:', err);
            this.histories = [];  
            }
        });
    }
        
}