# App Tarefas UI - Frontend Angular

Este é o frontend em Angular para o aplicativo de gerenciamento de tarefas e notas, desenvolvido para integrar com o backend Java Spring Boot.

## Funcionalidades

- **Autenticação JWT**: Login e registro de usuários
- **Dashboard Interativo**: Interface principal com notas e listas de tarefas
- **Notas Adesivas**: Criação, edição e exclusão de notas
- **Listas de Tarefas**: Gerenciamento completo de listas e tarefas
- **Interface Responsiva**: Compatível com desktop e mobile

## Tecnologias Utilizadas

- Angular 19.2.0
- PrimeNG (componentes UI)
- Angular JWT (@auth0/angular-jwt)
- Moment.js (manipulação de datas)
- TypeScript
- CSS3 com Flexbox e Grid

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/                    # Modelos e serviços centrais
│   │   ├── model.ts            # Classes e interfaces TypeScript
│   │   └── error-handler.service.ts
│   ├── security/               # Autenticação e segurança
│   │   ├── auth.service.ts     # Serviço de autenticação JWT
│   │   ├── auth.guard.ts       # Guard de proteção de rotas
│   │   └── login-form/         # Componente de login
│   ├── usuarios/               # Módulo de usuários
│   │   └── usuario-cadastro/   # Componente de cadastro
│   ├── dashboard/              # Tela principal
│   │   └── dashboard/          # Componente do dashboard
│   ├── services/               # Serviços de API
│   │   ├── nota.service.ts
│   │   ├── lista-tarefa.service.ts
│   │   └── tarefa.service.ts
│   ├── app.component.*         # Componente raiz
│   ├── app.config.ts           # Configurações da aplicação
│   └── app.routes.ts           # Definição de rotas
└── styles.css                 # Estilos globais
```

## Configuração e Instalação

### Pré-requisitos

- Node.js 20.x ou superior
- npm 10.x ou superior
- Angular CLI 19.2.0

### Instalação

1. **Clone ou extraia o projeto**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o backend:**
   - Certifique-se de que o backend Java Spring Boot esteja rodando em `http://localhost:8080`
   - As rotas da API devem estar configuradas conforme esperado pelos serviços

### Executando a Aplicação

```bash
# Desenvolvimento
ng serve

# Build para produção
ng build

# Testes
ng test
```

A aplicação estará disponível em `http://localhost:4200`

## Integração com o Backend

### Endpoints Esperados

O frontend espera que o backend forneça os seguintes endpoints:

#### Autenticação
- `POST /api/usuarios/login` - Login do usuário
- `POST /api/usuarios/registrar` - Registro de novo usuário

#### Notas
- `GET /api/notas/usuario/{userId}` - Listar notas do usuário
- `POST /api/notas` - Criar nova nota
- `PUT /api/notas/{id}` - Atualizar nota
- `DELETE /api/notas/{id}` - Excluir nota
- `PATCH /api/notas/{id}/posicao` - Atualizar posição da nota

#### Listas de Tarefas
- `GET /api/listas-tarefas/usuario/{userId}` - Listar listas do usuário
- `POST /api/listas-tarefas` - Criar nova lista
- `PUT /api/listas-tarefas/{id}` - Atualizar lista
- `DELETE /api/listas-tarefas/{id}` - Excluir lista
- `PATCH /api/listas-tarefas/{id}/posicao` - Atualizar posição da lista

#### Tarefas
- `GET /api/tarefas/lista/{listaId}` - Listar tarefas de uma lista
- `POST /api/tarefas` - Criar nova tarefa
- `PUT /api/tarefas/{id}` - Atualizar tarefa
- `DELETE /api/tarefas/{id}` - Excluir tarefa
- `PATCH /api/tarefas/{id}/toggle-concluida` - Marcar/desmarcar como concluída

### Configuração de CORS

O backend deve permitir requisições do frontend:

```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Formato JWT

O token JWT deve conter as seguintes informações no payload:
- `sub`: email do usuário
- `user_id`: ID do usuário
- `user_name`: email do usuário
- `name`: nome completo do usuário

## Funcionalidades Implementadas

### 1. Sistema de Autenticação
- Login com email e senha
- Registro de novos usuários
- Proteção de rotas com guards
- Armazenamento seguro do token JWT
- Logout automático quando token expira

### 2. Dashboard Principal
- Interface tipo "workspace" com blocos arrastáveis
- Visualização de notas e listas de tarefas
- Criação rápida de novos itens
- Edição inline de conteúdo

### 3. Gerenciamento de Notas
- Criação de notas com título e conteúdo
- Edição e exclusão de notas
- Posicionamento livre no workspace
- Interface similar a post-its

### 4. Gerenciamento de Tarefas
- Criação de listas de tarefas
- Adição de tarefas às listas
- Marcação de tarefas como concluídas
- Data de vencimento para tarefas
- Organização visual das listas

### 5. Interface Responsiva
- Layout adaptável para diferentes tamanhos de tela
- Componentes otimizados para touch em dispositivos móveis
- Grid responsivo para organização dos blocos

## Componentes Principais

### AuthService
Gerencia autenticação JWT, login, logout e verificação de permissões.

### ErrorHandlerService
Centraliza o tratamento de erros da aplicação com mensagens amigáveis.

### DashboardComponent
Componente principal que orquestra a exibição e interação com notas e listas.

### Guards
- `AuthGuard`: Protege rotas que requerem autenticação

## Estilos e Temas

O projeto utiliza PrimeNG com tema Aura e inclui:
- Paleta de cores consistente
- Componentes responsivos
- Ícones do PrimeIcons
- Grid system do PrimeFlex

## Considerações de Segurança

- Tokens JWT armazenados no localStorage
- Interceptadores automáticos para adicionar tokens às requisições
- Validação de expiração de tokens
- Redirecionamento automático para login quando não autenticado

## Próximos Passos

Para expandir a aplicação, considere:

1. **Funcionalidades Drag & Drop**: Implementar arrastar e soltar para reposicionar blocos
2. **Colaboração**: Permitir compartilhamento de listas entre usuários
3. **Notificações**: Sistema de lembretes para tarefas com vencimento
4. **Temas**: Múltiplos temas visuais
5. **Offline**: Suporte para funcionamento offline com sincronização
6. **Anexos**: Permitir anexar arquivos às notas e tarefas

## Suporte

Para dúvidas ou problemas:
1. Verifique se o backend está rodando corretamente
2. Confirme se as rotas da API estão configuradas
3. Verifique o console do navegador para erros JavaScript
4. Confirme se as dependências estão instaladas corretamente

