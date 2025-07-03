import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Nota } from '../../core/model';
import { NotaService } from '../../services/nota.service';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {

  @Input() notas: Nota[] = [];
  @Output() notasChange = new EventEmitter<Nota[]>();

  // Dialog
  notaDialogVisible = false;
  
  // Modelo para edição
  notaAtual = new Nota();

  constructor(
    private notaService: NotaService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  // Métodos para Notas
  novaNota(): void {
    this.notaAtual = new Nota(this.authService.jwtPayload?.user_id);
    this.notaDialogVisible = true;
  }

  editarNota(nota: Nota): void {
    this.notaAtual = { ...nota };
    this.notaDialogVisible = true;
  }

  salvarNota(): void {
    if (this.notaAtual.id) {
      this.notaService.update(this.notaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Nota atualizada com sucesso!' });
          this.carregarNotas();
          this.notaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    } else {
      this.notaService.add(this.notaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Nota criada com sucesso!' });
          this.carregarNotas();
          this.notaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    }
  }

  excluirNota(nota: Nota): void {
    this.notaService.delete(nota.id)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Nota excluída com sucesso!' });
        this.carregarNotas();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  private carregarNotas(): void {
    this.notaService.listByUser()
      .then(notas => {
        this.notas = notas;
        this.notasChange.emit(this.notas);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onNotaPositionChange(nota: Nota, event: any): void {
    // Implementar lógica de drag & drop se necessário
    // Por enquanto, apenas atualiza a posição
    this.notaService.updatePosition(nota.id, event.posX, event.posY)
      .catch(error => this.errorHandler.handle(error));
  }
}

