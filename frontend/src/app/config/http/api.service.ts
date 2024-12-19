import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { User } from '../../model/User.model';
import { catchError, throwError } from 'rxjs';
import { Category } from '../../model/Category.model';
import { Product } from '../../model/Product.model';

export const userKey = '__Market_user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private baseApiUrl = 'http://localhost:3001';
    constructor(private http: HttpClient) {} 

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseApiUrl}/users`); 
    }

    saveUser(user: User): Observable<any> {
        const method = user.id ? 'put' : 'post'; 
        const url = `${this.baseApiUrl}/users${user.id ? `/${user.id}` : ''}`; 
        console.log(user.id)
        return this.http[method](url, user).pipe(
            catchError((error) => {
                console.error('Erro na requisição de salvar usuário:', error); 
                return throwError(()=>error); 
            })
        ); 
    }
      
    deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/users/${userId}`); 
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseApiUrl}/categories`); 
    }

    getCategoryId(id: string | null): Observable<Category> {
        return this.http.get<Category>(`${this.baseApiUrl}/categories/${id}`);
    }

    saveCategory(category: Category): Observable<any> {
        const method = category.id ? 'put' : 'post'; 
        const url = `${this.baseApiUrl}/categories${category.id ? `/${category.id}` : ''}`; 

        return this.http[method](url, category).pipe(
            catchError((error) => {
                console.error('Erro na requisição de salvar categoria:', error); 
                return throwError(()=>error); 
            })
        ); 
    }

    deleteCategory(categoryId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/categories/${categoryId}`); 
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseApiUrl}/products`); 
    }

    getProductId(id:string | null): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.baseApiUrl}/categories/${id}/products`); 
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseApiUrl}/allproducts`); 
    }

    saveProduct(product: Product): Observable<any> {
        const method = product.id ? 'put' : 'post'; 
        const url = `${this.baseApiUrl}/products${product.id ? `/${product.id}` : ''}`; 

        return this.http[method](url, product).pipe(
            catchError((error) => {
                console.error('Erro na requisição de salvar produto:', error); 
                return throwError(()=>error); 
            })
        ); 
    }

    deleteProduct(productId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/products/${productId}`); 
    }

    saveCart(userId: number, productId: number): Observable<any> {
        const url = `${this.baseApiUrl}/cart/${userId}/${productId}`; 

        return this.http.post(url, {}).pipe(
            catchError((error) => {
                console.error('Erro na requisição de salvar categoria:', error); 
                return throwError(()=>error); 
            })
        ); 
    }
}
