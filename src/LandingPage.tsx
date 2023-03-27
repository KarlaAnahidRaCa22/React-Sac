import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Login from "./Login";
import ListadoCotizacion from "./cotizacion/ListadoCotizacion";
import { landingPageDTO } from "./cotizacion/cotizacion.model";
import AlertaContext from "./utils/AlertaContext";
import { urlCotizacion } from "./utils/endpoints";
import Autorizado from "./auth/Autorizado";
import Inicio from "./utils/inicio";
import Button from "./utils/Button";
import { NavLink } from "react-router-dom";

export default function LandingPage(){

    const claseActiva = "active";
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
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to ="/empresaUsuario">
                                        Empresa Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to="/empresa">
                                        Empresa
                                    </NavLink>
                                </li>
                            </>}
                            noAutorizado={<>
                                <Login />
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to ="/empresaUsuario">
                                        Empresa Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to="/usuario">
                                        Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to="/empresa">
                                        Empresa
                                    </NavLink>
                                </li>
                            </>}
                        />
                        
                </div>
                <br/>
                <footer>El contenido del pie de página</footer>
            </AlertaContext.Provider>
            
        </>
    )
}