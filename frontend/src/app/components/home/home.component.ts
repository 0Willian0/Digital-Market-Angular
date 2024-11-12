import { Component, ViewEncapsulation } from "@angular/core";
import { pageTitleComponent } from "../templates/pageTitle/pageTitle.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [pageTitleComponent]
})
export class homeComponent{

}