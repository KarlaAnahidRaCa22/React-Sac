export interface empresaDTO {
    id: number;
    nombre: string;
    username: string;
    password: string;
    cadena_conexion: string;
}

export interface empresaUsuario{
    EmpresaId: number;
    IdUsuario: string;
}

export interface empresaUsuarioCreacionDTO{
    id: number;
    username: string;
    empresaId: number;
    idUsuario: string;
}