import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Category } from "../../../model/Category.model";
import { ApiService } from "../../../config/http/api.service";
import { NotificationService } from "../../../config/msgs/notification.service";
import { catchError, of } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-categoriesAdmin',
    templateUrl: './categoriesAdmin.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class categoriesAdminComponent implements OnInit{
    mode: 'save' | 'remove' = 'save';
    categoryForm: FormGroup;
    categories: Category[] = [];
    fields = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome' },
        { key: 'parentName', label: 'Categoria Pai' },
        { key: 'actions', label: 'Ações' }
    ];

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService
    ) {
        this.categoryForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            parentId: [{ value: '', disabled: this.mode === 'remove' }]
        });
    }


    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories() {
        this.apiService.getCategories().pipe(
            catchError((error) => {
                this.notificationService.notifyError('Erro ao carregar categorias.');
                return of([]);
            })
        ).subscribe((data: Category[]) => {
            this.categories = data;
        });
    }

    getParentCategoryName(parentId: string | number | undefined): string {
      const parentIdNumber = typeof parentId === 'string' ? parseInt(parentId, 10) : parentId;
      
      if (isNaN(parentIdNumber as number)) return ''; 
  
      const parentCategory = this.categories.find(cat => cat.id === parentIdNumber);
      return parentCategory ? parentCategory.name || '' : '';
  }
  
  
    loadCategory(category: Category, mode: 'save' | 'remove') {
        this.mode = mode;
        this.categoryForm.patchValue(category);
        this.updateParentIdState();
    }

    updateParentIdState() {
        if (this.mode === 'remove') {
            this.categoryForm.get('parentId')?.disable();
        } else {
            this.categoryForm.get('parentId')?.enable();
        }
    }

    save() {
        if (this.categoryForm.invalid) {
            this.notificationService.notifyError('Preencha todos os campos obrigatórios.');
            return;
        }
        
        const category:any = {
            name: this.categoryForm.get('name')?.value || '',
            parentId: this.categoryForm.get('parentId')?.value || null
        };
        
        const id = this.categoryForm.get('id')?.value;

        if (id) {
            category.id = id;
        }

        this.apiService.saveCategory(category).pipe(
            catchError((error) => {
                this.notificationService.notifyError('Erro ao salvar categoria.');
                return of(null);
            })
        ).subscribe(response => {
            if (response?.success) {
                this.notificationService.notifySuccess('Categoria salva com sucesso!');
                this.loadCategories();
                this.reset();
            } else {
                this.notificationService.notifyError('Falha ao salvar a categoria.');
            }
        });
    }

    remove() {
        const categoryId = this.categoryForm.get('id')?.value;
        if (categoryId) {
            this.apiService.deleteCategory(categoryId).pipe(
                catchError((error) => {
                    this.notificationService.notifyError('Erro ao remover categoria.');
                    return of(null);
                })
            ).subscribe(() => {
                this.notificationService.notifySuccess('Categoria removida com sucesso!');
                this.loadCategories();
                this.reset();
            });
        }
    }

    reset() {
        this.categoryForm.reset();
        this.mode = 'save';
        this.updateParentIdState();
    }
}
