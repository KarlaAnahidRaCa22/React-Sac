
import LandingPage from "./LandingPage";

import CrearCotizacion from "./cotizacion/CrearCotizacion";
import EditarCotizacion from "./cotizacion/EditarCotizacion";
import FiltroCotizacion from "./cotizacion/FiltroCotizacion";
import DetalleCotizacion from "./cotizacion/DetalleCotizacion";
import VistaCotizacion from "./cotizacion/VistaCotizacion";




import RedireccionarALanding from "./utils/RedireccionarALanding";
import Registro from "./auth/Registro";
//import Login from "./Login";
import Menu from "./Menu/Menu";
import Inicio from "./utils/inicio";

import IndiceUsuario from "./auth/IndiceUsuario";
import IndiceEmpresa from "./empresa/IndiceEmpresa";
import IndiceEmpresaUsuario from "./empresa/IndiceEmpresaUsuario";
import Autorizado from "./auth/Autorizado";

const rutas = [
    {path: '/inicio', componente: Inicio},

    {path: '/cotizacion/:id(\\d+)', componente: DetalleCotizacion},
    {path: '/cotizacion/crear', componente: CrearCotizacion, esAutorizado:true},
    {path: '/cotizacion/editar/:id(\\d+)', componente: EditarCotizacion, esAdmin:true},
    {path: '/cotizacion/filtro', componente: FiltroCotizacion},
    {path: '/cotizacion/vista', componente: VistaCotizacion},

    
    {path: '/registro', componente: Registro},
    //{path: '/login', componente: Login},
    {path: '/menu', componente: Menu},
    {path: '/usuario', componente: IndiceUsuario},
    {path: '/empresa', componente: IndiceEmpresa},
    {path: '/empresaUsuario', componente: IndiceEmpresaUsuario},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
    
];

export default rutas;