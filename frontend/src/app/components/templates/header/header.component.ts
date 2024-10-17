import { Component, Input } from "@angular/core";

@Component({
    selector:'app-header',
    standalone: true,
    templateUrl:'./header.component.html',
})
export class HeaderComponent {
    @Input() title: string = '';          // Recebe o título
    //@Input() hideToggle: boolean = false; // Recebe o estado do toggle
    //@Input() hideUserDropdown: boolean = false; // Recebe o estado do dropdown
  }
