import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { Nota, ListaTarefa, Tarefa } from '../../core/model';
import { NotaService } from '../../services/nota.service';
import { ListaTarefaService } from '../../services/lista-tarefa.service';
import { TarefaService } from '../../services/tarefa.service';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  notas: Nota[] = [];
  listasTarefas: ListaTarefa[] = [];
  
  // Dialogs
  notaDialogVisible = false;
  listaDialogVisible = false;
  tarefaDialogVisible = false;
  
  // Modelos para edição
  notaAtual = new Nota();
  listaAtual = new ListaTarefa();
  tarefaAtual = new Tarefa();
  listaAtualParaTarefa: ListaTarefa | null = null;

  constructor(
    private notaService: NotaService,
    private listaTarefaService: ListaTarefaService,
    private tarefaService: TarefaService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarNotas();
    this.carregarListasTarefas();
  }

  carregarNotas(): void {
    this.notaService.listByUser()
      .then(notas => {
        this.notas = notas;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarListasTarefas(): void {
    this.listaTarefaService.listByUser()
      .then(listas => {
        this.listasTarefas = listas;
        // Carregar tarefas para cada lista
        listas.forEach(lista => {
          this.carregarTarefasDaLista(lista);
        });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarTarefasDaLista(lista: ListaTarefa): void {
    this.tarefaService.listByLista(lista.id)
      .then(tarefas => {
        lista.tarefas = tarefas;
      })
      .catch(error => this.errorHandler.handle(error));
  }

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

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}

