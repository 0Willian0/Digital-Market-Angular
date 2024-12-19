import { Component } from "@angular/core";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { userAdminComponent } from "../userAdmin/userAdmin.component";
import { categoriesAdminComponent } from "../categoriesAdmin/categoriesAdmin.component";
import { productsAdminComponent } from "../productAdmin/productsAdmin.component";

@Component({
    selector:'app-adminPage',
    templateUrl:'./adminPage.component.html',
    styleUrl:'./adminPage.component.css',
    imports: [pageTitleComponent, 
        userAdminComponent,
        categoriesAdminComponent,
        productsAdminComponent,
        MatTabsModule, 
        MatCardModule, 
        CommonModule],
    standalone:true,
})
export class adminPageComponent{

}