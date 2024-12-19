import { Component, ViewEncapsulation } from "@angular/core";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { AllProductsComponent } from "../AllProducts/allProducts.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [pageTitleComponent, AllProductsComponent]
})
export class homeComponent{

}