import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ListaTarefa } from '../core/model';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListaTarefaService {

  private apiUrl = 'http://localhost:8080/api/listas-tarefas';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  async list(): Promise<ListaTarefa[]> {
    return await firstValueFrom(this.http.get<ListaTarefa[]>(this.apiUrl));
  }

  async listByUser(): Promise<ListaTarefa[]> {
    const userId = this.auth.jwtPayload?.user_id;
    return await firstValueFrom(this.http.get<ListaTarefa[]>(`${this.apiUrl}/usuario/${userId}`));
  }

  async findById(id: number): Promise<ListaTarefa> {
    return await firstValueFrom(this.http.get<ListaTarefa>(`${this.apiUrl}/${id}`));
  }

  async add(listaTarefa: ListaTarefa): Promise<ListaTarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<ListaTarefa>(this.apiUrl, ListaTarefa.toJson(listaTarefa), { headers })
    );
  }

  async update(listaTarefa: ListaTarefa): Promise<ListaTarefa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.put<ListaTarefa>(`${this.apiUrl}/${listaTarefa.id}`, ListaTarefa.toJson(listaTarefa), { headers })
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  async updatePosition(id: number, posX: number, posY: number): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    await firstValueFrom(
      this.http.patch(`${this.apiUrl}/${id}/posicao`, { posX, posY }, { headers })
    );
  }
}

