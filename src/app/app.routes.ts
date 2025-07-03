import { Routes } from '@angular/router';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { authGuard } from './security/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'usuarios/novo', component: UsuarioCadastroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];

