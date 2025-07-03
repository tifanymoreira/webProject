import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse, JwtPayload, Usuario } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/usuarios';
  jwtPayload: JwtPayload | null = null;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.loadToken();
  }

  async login(email: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const loginRequest: LoginRequest = { email, senha };

    try {
      const response: LoginResponse = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest, { headers })
      );
      
      this.storeToken(response.token);
    } catch (response: any) {
      if (response.status === 401) {
        return Promise.reject('Usuário e/ou senha inválida!');
      }
      return Promise.reject(response);
    }
  }

  async register(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return await firstValueFrom(
      this.http.post<Usuario>(`${this.apiUrl}/registrar`, Usuario.toJson(usuario), { headers })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  hasPermission(permission: string): boolean {
    return this.jwtPayload != null && this.isLoggedIn();
  }

  private storeToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.storeToken(token);
    }
  }

  getCurrentUser(): JwtPayload | null {
    return this.jwtPayload;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

