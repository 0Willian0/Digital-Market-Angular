import { Component, Input, ViewEncapsulation } from "@angular/core";
import { History } from "../../../model/HistoryData.model";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-historyData',
    templateUrl: './historyData.component.html',
    styleUrl: './historyData.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterLink]
})
export class HistoryDataComponent{
    @Input() history!: History
    
}