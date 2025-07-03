import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Tarefa } from '../core/model';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) { }

  async list(): Promise<Tarefa[]> {
    const tarefas = await firstValueFrom(this.http.get<Tarefa[]>(this.apiUrl));
    tarefas.forEach(tarefa => this.stringToDate(tarefa));
    return tarefas;
  }

  async listByLista(listaId: number): Promise<Tarefa[]> {
    const tarefas = await firstValueFrom(this.http.get<Tarefa[]>(`${this.apiUrl}/lista/${listaId}`));
    tarefas.forEach(tarefa => this.stringToDate(tarefa));
    return tarefas;
  }

  async findById(id: number): Promise<Tarefa> {
    const tarefa = await firstValueFrom(this.http.get<Tarefa>(`${this.apiUrl}/${id}`));
    this.stringToDate(tarefa);
    return tarefa;
  }

  async add(tarefa: Tarefa): Promise<Tarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const novaTarefa = await firstValueFrom(
      this.http.post<Tarefa>(this.apiUrl, Tarefa.toJson(tarefa), { headers })
    );
    this.stringToDate(novaTarefa);
    return novaTarefa;
  }

  async update(tarefa: Tarefa): Promise<Tarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const tarefaAtualizada = await firstValueFrom(
      this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, Tarefa.toJson(tarefa), { headers })
    );
    this.stringToDate(tarefaAtualizada);
    return tarefaAtualizada;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  async toggleConcluida(id: number): Promise<Tarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const tarefa = await firstValueFrom(
      this.http.patch<Tarefa>(`${this.apiUrl}/${id}/toggle-concluida`, {}, { headers })
    );
    this.stringToDate(tarefa);
    return tarefa;
  }

  private stringToDate(tarefa: Tarefa): void {
    if (tarefa.dataVencimento && typeof tarefa.dataVencimento === 'string') {
      tarefa.dataVencimento = moment(tarefa.dataVencimento, 'DD/MM/YYYY').toDate();
    }
  }
}

