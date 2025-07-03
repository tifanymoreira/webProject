import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListaTarefa, Tarefa } from '../../core/model';
import { ListaTarefaService } from '../../services/lista-tarefa.service';
import { TarefaService } from '../../services/tarefa.service';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent {

  @Input() listasTarefas: ListaTarefa[] = [];
  @Output() listasTarefasChange = new EventEmitter<ListaTarefa[]>();

  // Dialogs
  listaDialogVisible = false;
  tarefaDialogVisible = false;
  
  // Modelos para edição
  listaAtual = new ListaTarefa();
  tarefaAtual = new Tarefa();
  listaAtualParaTarefa: ListaTarefa | null = null;

  constructor(
    private listaTarefaService: ListaTarefaService,
    private tarefaService: TarefaService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  // Métodos para Listas de Tarefas
  novaLista(): void {
    this.listaAtual = new ListaTarefa(this.authService.jwtPayload?.user_id);
    this.listaDialogVisible = true;
  }

  editarLista(lista: ListaTarefa): void {
    this.listaAtual = { ...lista };
    this.listaDialogVisible = true;
  }

  salvarLista(): void {
    if (this.listaAtual.id) {
      this.listaTarefaService.update(this.listaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Lista atualizada com sucesso!' });
          this.carregarListasTarefas();
          this.listaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    } else {
      this.listaTarefaService.add(this.listaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Lista criada com sucesso!' });
          this.carregarListasTarefas();
          this.listaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    }
  }

  excluirLista(lista: ListaTarefa): void {
    this.listaTarefaService.delete(lista.id)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lista excluída com sucesso!' });
        this.carregarListasTarefas();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  // Métodos para Tarefas
  novaTarefa(lista: ListaTarefa): void {
    this.tarefaAtual = new Tarefa();
    this.tarefaAtual.lista = lista;
    this.listaAtualParaTarefa = lista;
    this.tarefaDialogVisible = true;
  }

  editarTarefa(tarefa: Tarefa): void {
    this.tarefaAtual = { ...tarefa };
    this.listaAtualParaTarefa = tarefa.lista;
    this.tarefaDialogVisible = true;
  }

  salvarTarefa(): void {
    if (this.tarefaAtual.id) {
      this.tarefaService.update(this.tarefaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Tarefa atualizada com sucesso!' });
          this.carregarListasTarefas();
          this.tarefaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    } else {
      this.tarefaService.add(this.tarefaAtual)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Tarefa criada com sucesso!' });
          this.carregarListasTarefas();
          this.tarefaDialogVisible = false;
        })
        .catch(error => this.errorHandler.handle(error));
    }
  }

  excluirTarefa(tarefa: Tarefa): void {
    this.tarefaService.delete(tarefa.id)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Tarefa excluída com sucesso!' });
        this.carregarListasTarefas();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  toggleTarefaConcluida(tarefa: Tarefa): void {
    this.tarefaService.toggleConcluida(tarefa.id)
      .then(tarefaAtualizada => {
        tarefa.concluida = tarefaAtualizada.concluida;
        this.messageService.add({ 
          severity: 'success', 
          detail: tarefa.concluida ? 'Tarefa concluída!' : 'Tarefa reaberta!' 
        });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  private carregarListasTarefas(): void {
    this.listaTarefaService.listByUser()
      .then(listas => {
        this.listasTarefas = listas;
        // Carregar tarefas para cada lista
        listas.forEach(lista => {
          this.carregarTarefasDaLista(lista);
        });
        this.listasTarefasChange.emit(this.listasTarefas);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  private carregarTarefasDaLista(lista: ListaTarefa): void {
    this.tarefaService.listByLista(lista.id)
      .then(tarefas => {
        lista.tarefas = tarefas;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onListaPositionChange(lista: ListaTarefa, event: any): void {
    // Implementar lógica de drag & drop se necessário
    // Por enquanto, apenas atualiza a posição
    this.listaTarefaService.updatePosition(lista.id, event.posX, event.posY)
      .catch(error => this.errorHandler.handle(error));
  }
}

