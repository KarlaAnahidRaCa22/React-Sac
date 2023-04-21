import { useState } from "react";
import evolsoft from "../img/evolsoft.png";
import { cotizacionDTO } from "./cotizacion.model";

export default function VistaCotizacion() {
  const [cotizacion, setCotizacion] = useState<cotizacionDTO>();

  return (
    <>
      <div>
        <img
          src={evolsoft}
          style={{ width: "150px", right: "20px", marginTop: "09px" }}
        />
        <h5>Fecha: </h5>
        <h5>Cliente: </h5>
        <h5>Vendedor: </h5>
        
      </div>
      <div className="table-responsive" id="tabla">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Clave</th>
              <th>Articulo</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          
        </table>
        <h5>Observaciones: </h5>
      </div>
    </>
  );
}
