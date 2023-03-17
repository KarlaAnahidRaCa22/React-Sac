import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/manejadorJWT";
import Button from "./Button";
import logo from "../img/logo.png"
import RedireccionarALanding from "./RedireccionarALanding";

export default function Menu(){
    const claseActiva = "active";
    const {actualizar, claims} = useContext(AutenticacionContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === "email")[0]?.valor;
    }
    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <img src={logo}
                style={{bottom: '5px', right: '5px', width: '2vw'}} />
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
                            to="/cotizacion/filtro">
                                Filtrar Cotizacion
                            </NavLink>
                        </li>
                        
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva} 
                                    to="/generos">
                                        Géneros
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva} 
                                    to="/actores">
                                        Actores
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva} 
                                    to="/usuarios">
                                        Usuarios
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName={claseActiva}
                                    to ="/menu">
                                        Menu
                                    </NavLink>
                                </li>
                                        {/*<NavLink className="nav-link" activeClassName={claseActiva}
                                    to="/Menu">
                                        Menu
                                    </NavLink>*/}
                                    
                                        <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva} 
                                        to="/cotizacion/crear">
                                            Crear Cotizacion
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
                                <Button 
                                onClick={() => {
                                    logout();
                                    actualizar([]);
                                }}
                                className="nav-link btn btn-link">Log out</Button>
                                
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
