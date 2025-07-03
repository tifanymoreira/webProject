import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from '../../core/model';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.css'
})
export class UsuarioCadastroComponent {

  usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Usuário');
  }

  save(userForm: NgForm) {
    this.authService.register(this.usuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário cadastrado com sucesso!' });
        this.router.navigate(['/login']);
      })
      .catch(error => this.errorHandler.handle(error));
  }
}

