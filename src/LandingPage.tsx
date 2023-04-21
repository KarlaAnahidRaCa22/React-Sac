import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Login from "./Login";
import ListadoCotizacion from "./cotizacion/ListadoCotizacion";
import { landingPageDTO } from "./cotizacion/cotizacion.model";
import AlertaContext from "./utils/AlertaContext";
import { urlCotizacion, urlEmpresaUsuario } from "./utils/endpoints";
import Autorizado from "./auth/Autorizado";
import Inicio from "./utils/inicio";
import Boton from "./utils/Boton";
import { NavLink } from "react-router-dom";
import IndiceVendedor from "./vendedor/IndiceVendedor";

export default function LandingPage(){

    /*const claseActiva = "active";
    const [cotizacion, setCotizacion] = useState<landingPageDTO>({})
  
    useEffect(() => {
      cargarDatos();
    }, [])
    
    function cargarDatos() {
      axios.get(urlCotizacion)
      .then((respuesta: AxiosResponse<landingPageDTO>) => {
        setCotizacion(respuesta.data);
      })
    }*/

    return(
        <>
      
                <div style={{display:'flex', alignContent:'center'}}>
                        <Autorizado 
                            autorizado={<>
                                <Inicio />
                                <li className="nav-item">
                                    <NavLink className="nav-link" 
                                    to ="/empresaUsuario">
                                        Empresa Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" 
                                    to="/empresa">
                                        Empresa
                                    </NavLink>
                                </li>
                                
                            </>}
                            noAutorizado={<>
                                <Login />
                                
                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                    to ="/empresaUsuario">
                                        Empresa Usuario
                                    </NavLink>
                                </li>
                                
                                
                                <li className="nav-item">
                                    <NavLink className="nav-link" 
                                    to="/usuario">
                                        Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                    to="/empresa">
                                        Empresa
                                    </NavLink>
                                </li>
                                
                            </>}
                        />
                        
                </div>
                <br/>
                
            
            
        </>
    )
}