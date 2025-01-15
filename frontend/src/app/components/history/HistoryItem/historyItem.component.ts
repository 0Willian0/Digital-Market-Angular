import { Component, Input, ViewEncapsulation } from "@angular/core";
import { ProductData } from "../../../model/ProductData.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-historyItem',
    templateUrl: './historyItem.component.html',
    styleUrl: './historyItem.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule]
})
export class HistoryItemComponent{
    @Input() product!: ProductData

    get formatTime(): string{
        const dateBuyed = this.product.dateBuyed ? new Date(this.product.dateBuyed) : null
        return dateBuyed ? dateBuyed.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : ''
    }
}