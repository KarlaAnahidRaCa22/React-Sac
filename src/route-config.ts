
import LandingPage from "./LandingPage";

import CrearCotizacion from "./cotizacion/CrearCotizacion";
import EditarCotizacion from "./cotizacion/EditarCotizacion";
import FiltroCotizacion from "./cotizacion/FiltroCotizacion";
import DetalleCotizacion from "./cotizacion/DetalleCotizacion";

import RedireccionarALanding from "./utils/RedireccionarALanding";
import Registro from "./auth/Registro";
//import Login from "./Login";
import Menu from "./Menu/Menu";
import Inicio from "./utils/inicio";

import IndiceUsuarios from "./auth/IndiceUsuarios";
import Autorizado from "./auth/Autorizado";

const rutas = [
    {path: '/inicio', componente: Inicio},

    {path: '/cotizacion/:id(\\d+)', componente: DetalleCotizacion},
    {path: '/cotizacion/crear', componente: CrearCotizacion, esAutorizado:true},
    {path: '/cotizacion/editar/:id(\\d+)', componente: EditarCotizacion, esAdmin:true},
    {path: '/cotizacion/filtro', componente: FiltroCotizacion},

    {path: '/registro', componente: Registro},
    //{path: '/login', componente: Login},
    {path: '/menu', componente: Menu},
    {path: '/usuarios', componente: IndiceUsuarios},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
    
];

export default rutas;