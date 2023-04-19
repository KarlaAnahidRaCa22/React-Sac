import axios from "axios";
import Swal from "sweetalert2";
import Boton from "../utils/Boton";
import confirmar from "../utils/Confirmar";
import { urlCotizacion, urlEmpresa } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { empresaDTO } from "./empresaUsuario.model";
import { clienteDTO, vendedorDTO } from "../cotizacion/cotizacion.model";
import { useState } from "react";

export default function IndiceEmpresa() {
  
  return (
    <>
      
      <IndiceEntidad<empresaDTO>
        url={`${urlEmpresa}/listadoEmpresa`}
        titulo="Empresa"
      >
        {(empresa) => (
          <>
            <thead>
              <tr>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {empresa?.map((empresa) => (
                <tr key={empresa.id}>
                  <td>{empresa.username}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndiceEntidad>
      
    </>
  );
}
