import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlCotizacion } from "../utils/endpoints";
import { convertirCotizacionAFormData } from "../utils/formDataUtils";
import { MostrarErrores } from "../utils/MostrarErrores";
import FormularioCotizacion from "./FormularioCotizacion";
import { cotizacionCreacionDTO, cotizacionDTO, cotizacionPutGetDTO } from "./cotizacion.model";
import IndiceVendedor from "../vendedor/IndiceVendedor";

export default function EditarCotizacion(){

    let cotizacion:cotizacionDTO= {
        id: 0, nombre: ''
    }
   // const [cotizacion, setCotizacion] = useState<cotizacionCreacionDTO>();
    const [cotizacionPutGet, setCotizacionPutGet] = useState<cotizacionPutGetDTO>();
    const {id}: any = useParams();
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlCotizacion}/PutGet/${id}`)
            .then((respuesta: AxiosResponse<cotizacionPutGetDTO>) => {
                const modelo: cotizacionCreacionDTO = {
                    nombre: respuesta.data.cotizacion.nombre,
                    resumen: respuesta.data.cotizacion.resumen,
                    
                };
                
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
            {cotizacion && cotizacionPutGet ? <FormularioCotizacion modelo={cotizacion} 
            onSubmit={async valores => await editar(valores)}                
            />  : <Cargando />}
            
            
        </>
    )
}