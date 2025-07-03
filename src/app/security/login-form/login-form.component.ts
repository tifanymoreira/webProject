import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  msg: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  login(email: string, senha: string): void {
    this.auth.login(email, senha)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.msg = typeof error === 'string' ? error : 'Erro ao fazer login';
        this.messageService.add({ 
          severity: 'error', 
          detail: this.msg 
        });
      });
  }
}

