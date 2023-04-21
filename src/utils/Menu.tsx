import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/manejadorJWT";
import Boton from "./Boton";
import evolsoft from "../img/evolsoft.png"
import RedireccionarALanding from "./RedireccionarALanding";
import FormGroupFecha from "./FormGroupFecha";

export default function Menu(){
    const claseActiva = "active";
    const history = useHistory();
    const {actualizar, claims} = useContext(AutenticacionContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === "email")[0]?.valor;
    }
    
    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <img src={evolsoft}
                style={{bottom: '25px', right: '25px', width: '4vw'}} />
                <NavLink className="navbar-brand" 
                activeClassName={claseActiva}
                to="/">React SAC</NavLink>
                <div className="collapse navbar-collapse" 
                    style={{display: 'flex', justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                           <Autorizado role="admin"
                            autorizado={<>     
                        
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva} 
                                    to="/usuario">
                                        Usuario
                                    </NavLink>
                                </li>
                                
                                        
                                </>}/>
                                <Autorizado
                                    autorizado={<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} 
                                        to="/cotizacion/crear">
                                            Cotizaciones
                                        </NavLink>
                                    </li>
                                    
                                    </>}
                                    noAutorizado={<>
                                    
                                    </>}
                                />
                                
                                
                            
                        
                        
                    </ul>
                    
                    <div className="d-flex">
                        <Autorizado 
                            autorizado={<>
                                <span className="nav-link">Bienvenido, {obtenerNombreUsuario()}</span>
                                {/*<span className="nav-date"><FormGroupFecha campo={"fecha"} label={"fecha"} /></span>*/}
                                <Boton 
                                onClick={() => {
                                    logout();
                                    actualizar([]);
                                }}
                                className="nav-link btn btn-link">Cerrar Sesión</Boton>
                                
                                
                            </>}
                            noAutorizado={<>
                                <Link to="/Registro" className="nav-link btn btn-link">
                                        Registro
                                </Link>
                               {/* <Link to="/Login" className="nav-link btn btn-link">
                                        Login
                            </Link> */}
                                
                            </>}
                        />
                    </div>

                </div>
            </div>
            
        </nav>
        
        </>
    )
}
