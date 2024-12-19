import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../../config/http/api.service';
import { NotificationService } from '../../../config/msgs/notification.service';
import { User } from '../../../model/User.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-userAdmin',
    templateUrl: './userAdmin.component.html',
    styleUrl: './userAdmin.component.css',
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule]
})
export class userAdminComponent implements OnInit{
  mode: 'save' | 'remove' = 'save';
  userForm: FormGroup;
  users: User[] = [];
  fields = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'balance', label: 'Saldo' },
    { key: 'admin', label: 'Administrador' },
    { key: 'actions', label: 'Ações' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      balance: [''],
      imageUrl: [''],
      admin: [false],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().pipe(
      catchError((error) => {
        this.notificationService.notifyError('Erro ao carregar usuários.');
        return of([]);
      })
    ).subscribe((data: User[]) => this.users = data);
  }

  loadUser(user: User, mode: 'save' | 'remove') {
    this.mode = mode;
    this.userForm.patchValue(user);
  }

  save() {
    const user:any = {
      name: this.userForm.get('name')?.value || '',
      email: this.userForm.get('email')?.value || '',
      balance: parseFloat(this.userForm.get('balance')?.value) || 0,
      imageUrl: this.userForm.get('imageUrl')?.value || '',
      admin: this.userForm.get('admin')?.value || false,
      password: this.userForm.get('password')?.value || '',
      confirmPassword: this.userForm.get('confirmPassword')?.value || '',
    };

    const id = this.userForm.get('id')?.value;

    if (id) {
        user.id = id;
    }

    this.apiService.saveUser(user).pipe(
        catchError((error) => {
            this.notificationService.notifyError('Erro ao salvar usuário.');
            return of(null);
        })
    ).subscribe(response => {
        if (response?.success) {
            this.notificationService.notifySuccess('Usuário salvo com sucesso!');
            this.loadUsers();
        } else {
            this.notificationService.notifyError('Falha ao salvar o usuário.');
        }
    });
  }

  remove() {
    const userId = this.userForm.get('id')?.value;
    if (userId) {
      this.apiService.deleteUser(userId).pipe(
        catchError((error) => {
          this.notificationService.notifyError('Erro ao remover usuário.');
          return of(null);
        })
      ).subscribe(() => {
        this.notificationService.notifySuccess('Usuário removido com sucesso!');
        this.loadUsers();
      });
    }
  }

  reset() {
    this.userForm.reset();
    this.mode = 'save';
  }
}

