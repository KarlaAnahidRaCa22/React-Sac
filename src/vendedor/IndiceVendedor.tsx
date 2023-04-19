import { useContext, useState } from "react";
import { vendedorDTO } from "../cotizacion/cotizacion.model";
import IndiceEntidad from "../utils/IndiceEntidad";
import { urlCotizacion } from "../utils/endpoints";
import AutenticacionContext from "../auth/AutenticacionContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { respuestaAutenticacion } from "../auth/auth.model";
import { guardarTokenLocalStorage, obtenerClaims } from "../auth/manejadorJWT";
import { MostrarErrores } from "../utils/MostrarErrores";
import FormularioVendedor from "./FormularioVendedor";

export default function IndiceVendedor() {
  let vendedor:vendedorDTO= {clave_usuario:0, nombre_usuario: ''}
  const [vendedorUsuario, setVendedorUsuario] = useState<vendedorDTO>(vendedor);
  const {actualizar} = useContext(AutenticacionContext);
  const [errores, setErrores] = useState<string[]>([]);
  const history = useHistory();
  
  
  async function Conectar(vendedorUsuario: vendedorDTO) {
      try{
          console.log("Conectar", vendedorUsuario)
          const respuesta = await axios
              .post<respuestaAutenticacion>(`${urlCotizacion}/listadoVendedor`, vendedorUsuario);

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
      
      <MostrarErrores errores={errores} />
      <FormularioVendedor clave_usuario={0} nombre_usuario={""} vendedorSeleccionado={[]}
      modelo={vendedorUsuario} 
      onSubmit={async valores => await Conectar(valores)}        
      /> 
      
      </>
  )
}
