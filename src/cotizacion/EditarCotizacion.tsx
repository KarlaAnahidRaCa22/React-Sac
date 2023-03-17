import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlCotizacion } from "../utils/endpoints";
import { convertirCotizacionAFormData } from "../utils/formDataUtils";
import { MostrarErrores } from "../utils/MostrarErrores";
import FormularioCotizacion from "./FormularioCotizacion";
import { cotizacionCreacionDTO, cotizacionPutGetDTO } from "./cotizacion.model";

export default function EditarCotizacion(){

    const [cotizacion, setCotizacion] = useState<cotizacionCreacionDTO>();
    const [cotizacionPutGet, setCotizacionPutGet] = useState<cotizacionPutGetDTO>();
    const {id}: any = useParams();
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlCotizacion}/PutGet/${id}`)
            .then((respuesta: AxiosResponse<cotizacionPutGetDTO>) => {
                const modelo: cotizacionCreacionDTO = {
                    nombre: respuesta.data.cotizacion.nombre,
                    enCines: respuesta.data.cotizacion.enCines,
                    trailer: respuesta.data.cotizacion.trailer,
                    posterURL: respuesta.data.cotizacion.poster,
                    resumen: respuesta.data.cotizacion.resumen,
                    fechaLanzamiento: new Date(respuesta.data.cotizacion.fechaLanzamiento)
                };
                setCotizacion(modelo);
                setCotizacionPutGet(respuesta.data);
            })
    }, [id])

    async function editar(cotizacionEditar: cotizacionCreacionDTO) {
        try{
            const formData = convertirCotizacionAFormData(cotizacionEditar);
            await axios ({
                method: 'put',
                url: `${urlCotizacion}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push(`/cotizacion/${id}`);
        }

        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Editar Cotización</h3>
            <MostrarErrores errores={errores} />
            {cotizacion && cotizacionPutGet ? <FormularioCotizacion 
                
                    modelo={cotizacion}
                    onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
            
        </>
    )
}