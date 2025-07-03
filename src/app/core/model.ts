import moment from 'moment';

export class Usuario {
  id!: number;
  email!: string;
  senha!: string;
  nome!: string;
  blocos: Bloco[] = [];

  static toJson(usuario: Usuario): any {
    return {
      id: usuario.id,
      email: usuario.email,
      senha: usuario.senha,
      nome: usuario.nome
    };
  }
}

export abstract class Bloco {
  id!: number;
  posX!: number;
  posY!: number;
  dono!: Usuario;

  constructor(usuarioId?: number) {
    if (usuarioId) {
      this.dono = new Usuario();
      this.dono.id = usuarioId;
    }
  }
}

export class Nota extends Bloco {
  titulo!: string;
  conteudo!: string;

  constructor(usuarioId?: number) {
    super(usuarioId);
  }

  static toJson(nota: Nota): any {
    return {
      id: nota.id,
      titulo: nota.titulo,
      conteudo: nota.conteudo,
      posX: nota.posX,
      posY: nota.posY,
      dono: nota.dono
    };
  }
}

export class ListaTarefa extends Bloco {
  titulo!: string;
  tarefas: Tarefa[] = [];

  constructor(usuarioId?: number) {
    super(usuarioId);
  }

  static toJson(listaTarefa: ListaTarefa): any {
    return {
      id: listaTarefa.id,
      titulo: listaTarefa.titulo,
      posX: listaTarefa.posX,
      posY: listaTarefa.posY,
      dono: listaTarefa.dono,
      tarefas: listaTarefa.tarefas.map(tarefa => Tarefa.toJson(tarefa))
    };
  }
}

export class Tarefa {
  id!: number;
  descricao!: string;
  dataVencimento!: Date;
  concluida: boolean = false;
  lista!: ListaTarefa;

  constructor() {}

  static toJson(tarefa: Tarefa): any {
    return {
      id: tarefa.id,
      descricao: tarefa.descricao,
      dataVencimento: moment(tarefa.dataVencimento).format('DD/MM/YYYY'),
      concluida: tarefa.concluida,
      lista: tarefa.lista ? { id: tarefa.lista.id } : null
    };
  }

  private static stringToDate(tarefa: Tarefa): void {
    if (tarefa.dataVencimento) {
      tarefa.dataVencimento = moment(tarefa.dataVencimento, 'DD/MM/YYYY').toDate();
    }
  }
}

// Interfaces para autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface JwtPayload {
  sub: string;
  user_id: number;
  user_name: string;
  name: string;
  exp: number;
  iat: number;
}



// DTOs para resposta da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

