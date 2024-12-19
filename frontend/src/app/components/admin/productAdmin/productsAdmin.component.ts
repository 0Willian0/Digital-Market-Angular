import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from "../../../model/Product.model";
import { ApiService } from "../../../config/http/api.service";
import { NotificationService } from "../../../config/msgs/notification.service";
import { Category } from "../../../model/Category.model";
import { catchError, of } from "rxjs";

@Component({
    selector: 'app-productsAdmin',
    templateUrl: './productsAdmin.component.html',
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule]
})
export class productsAdminComponent implements OnInit{
    mode: 'save' | 'remove' = 'save'
    productForm: FormGroup
    products: Product[] = [];
    categories: Category[] = []
    fields = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome' },
        { key: 'price', label: 'Preço' },
        { key: 'actions', label: 'Ações' }
    ];

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService
    ) {
        this.productForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            price: [{ value: '', disabled: this.mode === 'remove' }],
            imageUrl: [''],
            categoryId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories()
    }

    loadProducts() {
        this.apiService.getProducts().subscribe((response: any) => {
            this.products = response.data || [];
          });
    }

    loadCategories() {
        this.apiService.getCategories().subscribe((response: any) => {
            this.categories = Array.isArray(response) ? response : response.categories || [];
          });
    }

    loadProduct(product: Product, mode: 'save' | 'remove') {
        this.mode = mode;
        this.productForm.patchValue(product);
        this.updateParentIdState();
    }

    updateParentIdState() {
        if (this.mode === 'remove') {
            this.productForm.get('parentId')?.disable();
        } else {
            this.productForm.get('parentId')?.enable();
        }
    }

    save() {
        if (this.productForm.invalid) {
            this.notificationService.notifyError('Preencha todos os campos obrigatórios.');
            return;
        }
        
        const product:any = {
            name: this.productForm.get('name')?.value || '',
            price: this.productForm.get('price')?.value || 0,
            imageUrl: this.productForm.get('imageUrl')?.value || '',
            categoryId: this.productForm.get('categoryId')?.value || null
        };
        
        const id = this.productForm.get('id')?.value;
        console.log(product)
        if (id) {
            product.id = id;
        }

        this.apiService.saveProduct(product).pipe(
            catchError((error) => {
                this.notificationService.notifyError('Erro ao salvar produto.');
                return of(null);
            })
        ).subscribe(response => {
            if (response?.success) {
                this.notificationService.notifySuccess('Produto salvo com sucesso!');
                this.loadProducts();
                this.reset();
            } else {
                this.notificationService.notifyError('Falha ao salvar a produto.');
            }
        });
    }

    remove() {
        const productId = this.productForm.get('id')?.value;
        if (productId) {
            this.apiService.deleteProduct(productId).pipe(
                catchError((error) => {
                    this.notificationService.notifyError('Erro ao remover produto.');
                    return of(null);
                })
            ).subscribe(() => {
                this.notificationService.notifySuccess('Produto removida com sucesso!');
                this.loadProducts();
                this.reset();
            });
        }
    }

    reset() {
        this.productForm.reset();
        this.mode = 'save';
        this.updateParentIdState();
    }

}