import { usuarioDTO } from "../auth/auth.model";

export interface empresaDTO {
    id: number;
    nombre: string;
    username: string;
    password: string;
    cadena_conexion: string;
}

export interface empresaUsuario{
    EmpresaId: number;
    UsuarioId: string;
}

export interface empresaUsuarioCreacionDTO{

    empresaId?: number;
    usuarioId?: string;
}

export interface empresaUsuarioPostGetDTO{
    empresa: empresaDTO[];
    usuario: usuarioDTO[];
}