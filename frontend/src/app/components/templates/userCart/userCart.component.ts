import { Component, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";


@Component({
    selector: 'app-userCart',
    templateUrl: './userCart.component.html',
    styleUrl: './userCart.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterModule]
})
export class userCartComponent{

}