import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AutenticacionContext from "./auth/AutenticacionContext";
import { credencialesUsuario, respuestaAutenticacion } from "./auth/auth.model";
import FormularioAuth from "./auth/FormularioAuth";
import { guardarTokenLocalStorage, obtenerClaims } from "./auth/manejadorJWT";
import { urlCuentas } from "./utils/endpoints";
import { MostrarErrores } from "./utils/MostrarErrores";

export default function Login() {
  const { actualizar } = useContext(AutenticacionContext);
  const [errores, setErrores] = useState<string[]>([]);
  const history = useHistory();

  async function login(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlCuentas}/login`,
        credenciales
      );

      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      history.push("/");
      console.log(respuesta);
    } catch (error) {
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <div style={{marginBlock:'150px', marginLeft: '150px'
    }}>
        

        <MostrarErrores errores={errores} />
        <FormularioAuth
          modelo={{ email: "", password: "" }}
          onSubmit={async (valores) => await login(valores)}
        />
      </div>
    </>
  );
}
