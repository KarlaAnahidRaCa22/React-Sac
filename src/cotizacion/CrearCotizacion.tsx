import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlCotizacion } from "../utils/endpoints";
import { convertirCotizacionAFormData } from "../utils/formDataUtils";
import { MostrarErrores } from "../utils/MostrarErrores";
import FormularioCotizacion from "./FormularioCotizacion";
import { cotizacionCreacionDTO } from "./cotizacion.model";
import FiltroCotizacion from "./FiltroCotizacion";

export default function CrearCotizacion(){


   // const [cargado, setCargado] = useState(false);
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    
    async function crear(cotizacion: cotizacionCreacionDTO) {
        try {
            const formData = convertirCotizacionAFormData(cotizacion);
            await axios({
                method: 'post',
                url: urlCotizacion,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/cotizacion/${respuesta.data}`);
            })
        }
        catch(error) {
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h1>Cotizaciones</h1>
           <MostrarErrores errores={errores} />
           <FiltroCotizacion />
           
           {/* {cargado ? */}
            <FormularioCotizacion
                
            /> {/*: <Cargando /> */}
            
            </>  
    )
}