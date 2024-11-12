import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppState, initialState } from "../../../config/store/app.reducer";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../config/store/app.selectors";
import { ViewEncapsulation } from "@angular/core";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-userDropdown',
    standalone: true,
    imports:[RouterModule],
    templateUrl: './userDropdown.component.html',
    styleUrl: './userDropdown.component.css',
    encapsulation: ViewEncapsulation.None
})
export class userDropdownComponent{
    user$: Observable<{}>
    name: string = initialState.user.name

    constructor(private store: Store<{ app: AppState }>) {
       this.user$ = this.store.select(selectUser)
    }
}