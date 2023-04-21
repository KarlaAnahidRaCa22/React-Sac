export interface cotizacionDTO{
    id: number;
    nombre: string;
    vendedor: vendedorDTO;
    cliente: clienteDTO;
    ventas: ventaDTO[];

}

export interface cotizacionCreacionDTO{
    nombre: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string;
    
}

export interface landingPageDTO {
    proximosEstrenos?: cotizacionDTO[];
}

export interface cotizacionPutGetDTO {
    cotizacion: cotizacionDTO;
}

export interface vendedorDTO{
    clave_usuario: number;
    nombre_usuario: string;
}

export interface clienteDTO{
    clave_cte: number;
    nombre: string;
}

export interface articulosDTO{
    clave_art: string;
    desc_art: string;
    precio_base_compra: number;
}

export interface ventaDTO{
    cantidad: number;
    clave: string;
    articulo: string;
    precio: number;
    porciento_descuento: number;
    importe_descuento: number;
    total: number;
}