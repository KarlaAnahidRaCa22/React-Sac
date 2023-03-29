import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import { credencialesUsuario, respuestaAutenticacion, usuarioDTO } from "../auth/auth.model";
import { guardarTokenLocalStorage, obtenerClaims } from "../auth/manejadorJWT";
import Button from "../utils/Button";
import Cargando from "../utils/Cargando";
import { urlCuentas, urlEmpresa, urlEmpresaUsuario } from "../utils/endpoints";
import { convertirEmpresaUsuarioAFormData } from "../utils/formDataUtils";
import { MostrarErrores } from "../utils/MostrarErrores";
import { empresaDTO, empresaUsuarioCreacionDTO, empresaUsuarioPostGetDTO } from "./empresaUsuario.model";
import FormularioEmpresaUsuario from "./FormularioEmpresaUsuario";

export default function IndiceEmpresaUsuario() {
   
    let empresa:empresaUsuarioCreacionDTO= {empresaId:0, usuarioId:''}
    const [empresaUsuario, setEmpresaUsuario] = useState<empresaUsuarioCreacionDTO>(empresa);
    const {actualizar} = useContext(AutenticacionContext);
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();
    
    
    async function Conectar(empresaUsuario: empresaUsuarioCreacionDTO) {
        try{
            console.log("Conectar", empresaUsuario)
            const respuesta = await axios
                .post<respuestaAutenticacion>(`${urlEmpresaUsuario}/todos`, empresaUsuario);

                guardarTokenLocalStorage(respuesta.data);
                actualizar(obtenerClaims());
                history.push("/");
                    
            console.log(respuesta.data);
        } catch (error){
            setErrores(error.response.data);
        }
    }
    return (
        <>
        <h1>Empresa Usuario</h1>
        <MostrarErrores errores={errores} />
        <FormularioEmpresaUsuario empresaId={0} UsuarioId={""} 
        modelo={empresaUsuario} 
        onSubmit={async valores => await Conectar(valores)}        
        /> 
        
        </>
    )
}


