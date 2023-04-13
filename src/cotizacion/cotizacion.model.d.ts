
export interface cotizacionDTO{
    id: number;
    nombre: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    
}

export interface cotizacionCreacionDTO{
    nombre: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string;
    
}

export interface landingPageDTO {
    proximosEstrenos?: login[];
}

export interface cotizacionPutGetDTO {
    cotizacion: cotizacionDTO;
}

export interface vendedorDTO{
    clave_usuario: number;
    nombre_usuario: string;
}