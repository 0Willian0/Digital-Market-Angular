import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { pageTitleComponent } from "../../templates/pageTitle/pageTitle.component";
import { Product } from "../../../model/Product.model";
import { Category } from "../../../model/Category.model";
import { ApiService } from "../../../config/http/api.service";
import { ProductItemComponent } from "../ProductItem/productItem.component";
import { CommonModule } from "@angular/common";
@Component({
    selector: 'app-productByCategory',
    templateUrl: './productByCategory.component.html',
    imports: [pageTitleComponent, ProductItemComponent, CommonModule],
    styleUrl: './productByCategory.component.css',
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class productByCategoryComponent implements OnInit{
    id: string | null = null;
    products: Product[]=[]
    categories: Category | null = null ;

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            if (this.id) {
                this.getCategory(); 
                this.getProduct();   
            }
        });
    }
    
    getCategory(): void {
        this.apiService.getCategoryId(this.id).subscribe({
            next: (data: Category) => {
                if (data) {
                    this.categories = data;  
                }
            },
            error: (err) => {
                console.error('Erro ao obter categoria:', err);
            }
        });
    }

    getProduct() {
        this.apiService.getProductId(this.id).subscribe({
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