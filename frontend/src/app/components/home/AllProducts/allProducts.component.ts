import { Component, ViewEncapsulation } from "@angular/core";
import { Product } from "../../../model/Product.model";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../config/http/api.service";
import { ProductItemComponent } from "../../product/ProductItem/productItem.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-allProducts',
    templateUrl: './allProducts.component.html',
    styleUrl: './allProducts.component.css',
    imports: [ProductItemComponent, CommonModule],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class AllProductsComponent{
    id: string | null = null;
    products: Product[]=[]

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  
    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.getProduct();   
        });
    }

    getProduct() {
        this.apiService.getAllProducts().subscribe({
          next: (products: Product[]) => {
            this.products = products;  
          },
          error: (err) => {
            console.error('Erro ao obter produtos:', err);
            this.products = [];  
          }
        });
    }
}