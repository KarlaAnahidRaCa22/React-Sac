
export interface cotizacionDTO{
    id: number;
    nombre: string;
    poster: string;
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento: Date;
    
}

export interface cotizacionCreacionDTO{
    nombre: string;
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string;
    
}

export interface landingPageDTO {
    enCines?: cotizacion[];
    proximosEstrenos?: cotizacion[];
}

export interface cotizacionPutGetDTO {
    cotizacion: cotizacionDTO;
}