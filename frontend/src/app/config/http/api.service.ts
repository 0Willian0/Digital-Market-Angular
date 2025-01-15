import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../model/User.model';
import { catchError, throwError } from 'rxjs';
import { Category } from '../../model/Category.model';
import { Product } from '../../model/Product.model';
import { Price } from '../../model/Price';
import { History } from '../../model/HistoryData.model';
import { Data } from '@angular/router';
import { ProductData } from '../../model/ProductData.model';

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

    getUserById(userId: number): Observable<User>{
        return this.http.get<User>(`${this.baseApiUrl}/users/${userId}`)
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

    getProductsCart(userId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseApiUrl}/cart/${userId}`); 
    }

    deleteProductCart(userId: number, productId: number):Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/cart/${userId}/${productId}`); 
    }

    getTotalPrice(userId: number): Observable<Price>{
        return this.http.get<Price>(`${this.baseApiUrl}/cartPrice/${userId}`)
    }

    putBalance(balance: number, userId: number): Observable<any> {
        const url = `${this.baseApiUrl}/cartPrice/${userId}`;
        return this.http.put(url, { balance }).pipe(
          catchError((error) => {
            console.error('Erro na requisição PUT para atualizar o saldo:', error);
            return throwError(() => error);
          })
        );
      }
      

    getHistory(userId: number): Observable<History[]>{
        return this.http.get<History[]>(`${this.baseApiUrl}/history/${userId}`)
    }

    getHistoryAndUpdate(userId: number): Observable<History> {
        const getUrl = `${this.baseApiUrl}/cartHistory/${userId}`;
        const putUrl = `${this.baseApiUrl}/history`;
      
        return this.http.get<History>(getUrl).pipe(
          switchMap((historyData: History) => {
            return this.http.post<History>(putUrl, historyData);  
          })
        );
    }

    deleteCart(userId: number): Observable<void>{
        return this.http.delete<void>(`${this.baseApiUrl}/cart/${userId}`)
    }

    getProductsHistory(dateBuyed: string, userId: number): Observable<ProductData[]> {
        const params = new HttpParams()
          .set('dateBuyed', dateBuyed) 
          .set('userId', userId.toString());
        return this.http.get<ProductData[]>(`${this.baseApiUrl}/history`, { params });
    }

    getTotalPriceHistory(dateBuyed: string, userId: number): Observable<Price> {
        const params = new HttpParams()
          .set('dateBuyed', dateBuyed) 
          .set('userId', userId.toString());
      
        return this.http.get<Price>(`${this.baseApiUrl}/historyProducts`, { params });
    }

    

}
