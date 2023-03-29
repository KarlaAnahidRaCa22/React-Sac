import { cotizacionCreacionDTO } from "../cotizacion/cotizacion.model";
import { empresaUsuarioCreacionDTO } from "../empresa/empresaUsuario.model";



export function convertirCotizacionAFormData(cotizacion: cotizacionCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', cotizacion.nombre);

    if (cotizacion.resumen){
        formData.append('resumen', cotizacion.resumen);
    }

    
    if (cotizacion.fechaLanzamiento){
        formData.append("fechaLanzamiento", formatearFecha(cotizacion.fechaLanzamiento));
    }

    if (cotizacion.poster){
        formData.append('poster', cotizacion.poster);
    }

    



    return formData;
}

export function convertirEmpresaUsuarioAFormData(empresaUsuario: empresaUsuarioCreacionDTO): FormData {
    const formData = new FormData();

    formData.append("empresaId", JSON.stringify(empresaUsuario.empresaId));
    formData.append("usuarioId", JSON.stringify(empresaUsuario.usuarioId));

    return formData;
}

function formatearFecha(date: Date){
    date = new Date(date);
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value:year}
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}