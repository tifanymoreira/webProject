import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// PrimeNG Services
import { MessageService, ConfirmationService } from 'primeng/api';

// JWT Module
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

// Components
import { AppComponent } from './app.component';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

// Routes
import { routes } from './app.routes';

// Services
import { AuthService } from './security/auth.service';
import { NotaService } from './services/nota.service';
import { ListaTarefaService } from './services/lista-tarefa.service';
import { TarefaService } from './services/tarefa.service';
import { ErrorHandlerService } from './core/error-handler.service';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/api/usuarios/login', 'http://localhost:8080/api/usuarios/registrar']
      }
    }),
    // Import standalone components
    AppComponent,
    LoginFormComponent,
    UsuarioCadastroComponent,
    DashboardComponent,
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    JwtHelperService,
    AuthService,
    NotaService,
    ListaTarefaService,
    TarefaService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }