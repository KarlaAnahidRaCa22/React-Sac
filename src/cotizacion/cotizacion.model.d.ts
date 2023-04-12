
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
    proximosEstrenos?: cotizacion[];
}

export interface cotizacionPutGetDTO {
    cotizacion: cotizacionDTO;
}