import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Login from "./Login";
import ListadoCotizacion from "./cotizacion/ListadoCotizacion";
import { landingPageDTO } from "./cotizacion/cotizacion.model";
import AlertaContext from "./utils/AlertaContext";
import { urlCotizacion } from "./utils/endpoints";
import Autorizado from "./auth/Autorizado";
import Inicio from "./utils/inicio";

export default function LandingPage(){

    const [cotizacion, setCotizacion] = useState<landingPageDTO>({})
  
    useEffect(() => {
      cargarDatos();
    }, [])
    
    function cargarDatos() {
      axios.get(urlCotizacion)
      .then((respuesta: AxiosResponse<landingPageDTO>) => {
        setCotizacion(respuesta.data);
      })
    }

    return(
        <>

            <AlertaContext.Provider value={() => cargarDatos()}>
                
                
                <div className="d-flex">
                        <Autorizado 
                            autorizado={<>
                                <Inicio />
                            </>}
                            noAutorizado={<>
                                <Login />
                                
                            </>}
                        />
                    </div>
            </AlertaContext.Provider>
            
        </>
    )
}