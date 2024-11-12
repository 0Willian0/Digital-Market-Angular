import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User.model';
import { catchError, throwError } from 'rxjs';
import { Category } from '../../model/Category.model';

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
}
