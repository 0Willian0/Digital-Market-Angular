import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  notifySuccess(msg?: string) {
    this.toastr.success(msg || 'Operação realizada com sucesso');
  }

  notifyError(msg?: string) {
    this.toastr.error(msg || 'Oops... Erro inesperado');
  }
}
