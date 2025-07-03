import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any): void {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 401) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      if (errorResponse.status === 404) {
        msg = 'Recurso não encontrado';
      }

      try {
        if (errorResponse.error && errorResponse.error.message) {
          msg = errorResponse.error.message;
        } else if (errorResponse.error && Array.isArray(errorResponse.error)) {
          msg = errorResponse.error[0].userMessage || errorResponse.error[0].message;
        }
      } catch (e) { 
        console.error('Erro ao processar mensagem de erro:', e);
      }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}

