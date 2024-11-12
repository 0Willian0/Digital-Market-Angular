import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-pageTitle',
    standalone: true,
    templateUrl: './pageTitle.component.html',
    styleUrl: './pageTitle.component.css',
    imports:[CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class pageTitleComponent{
    @Input() main: string = ''
    @Input() icon: string = ''
}