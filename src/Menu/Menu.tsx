import { Link, NavLink } from "react-router-dom";

export default function Menu(){

    const claseActiva = "active";
    

    return(
        <>
        
        <nav id="navigation">
            <div className="control-menu">
                <a href="navigation" className="open"><span>Abrir</span></a>
                <a href="#" className="close"><span>Cerrar</span></a>
            </div>
            <h1>Menu</h1>
            <ul className="nav-items">
                <li><a href="/cotizacion/crear"> <span>Cotizacion</span></a></li>
                <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva} 
                            to="/cotizacion/detalle">
                                Filtrar Cotizacion
                            </NavLink>
                            </li>

            </ul>
        </nav>
           
                
           
        </>
    )
}