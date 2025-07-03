import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Nota } from '../core/model';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiUrl = 'http://localhost:8080/api/notas';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  async list(): Promise<Nota[]> {
    return await firstValueFrom(this.http.get<Nota[]>(this.apiUrl));
  }

  async listByUser(): Promise<Nota[]> {
    const userId = this.auth.jwtPayload?.user_id;
    return await firstValueFrom(this.http.get<Nota[]>(`${this.apiUrl}/usuario/${userId}`));
  }

  async findById(id: number): Promise<Nota> {
    return await firstValueFrom(this.http.get<Nota>(`${this.apiUrl}/${id}`));
  }

  async add(nota: Nota): Promise<Nota> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<Nota>(this.apiUrl, Nota.toJson(nota), { headers })
    );
  }

  async update(nota: Nota): Promise<Nota> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.put<Nota>(`${this.apiUrl}/${nota.id}`, Nota.toJson(nota), { headers })
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

