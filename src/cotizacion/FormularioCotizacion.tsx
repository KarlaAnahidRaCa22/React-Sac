import { Field, Form, Formik, FormikHelpers } from "formik";
import { cotizacionCreacionDTO, cotizacionDTO } from "./cotizacion.model";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { Link, NavLink } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { useState } from "react";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";
import confirmar from "../utils/Confirmar";
import axios, { AxiosResponse } from "axios";
import { urlCotizacion } from "../utils/endpoints";

export default function FormularioCotizacion(){
    const valorInicial = {
        titulo: '',
        ventaId: 0,
        tiendaId: 0,
        origen: '',
        pagina: 1,
        recordsPorPagina: 10
    }
    const [cotizacion, setCotizacion] = useState<cotizacionDTO[]>([]);
   // const [venta, setVenta] = useState<ventaDto[]>([]);
   // const [tienda, setTienda] = useState<tiendaDto[]>([]);
   // const [origen, setOrigen] = useState<origen[]>([]);
    const [totalDePaginas, setTotalDePaginas] = useState(0);

    const claseActiva = "active";

   // function mapear(arreglo: {id: number, nombre: string}[]): selectorMultipleModel[]{
        

      //  return arreglo.map(valor => {
       //     return {llave: valor.id, valor:valor.nombre}
       // })}

        function buscarCotizacion(){
            console.log("Estos son los valores 1: ")
          //  modificarURL(valores);
            axios.get(`${urlCotizacion}/crear`)
                .then((respuesta: AxiosResponse<cotizacionDTO[]>) => { 
                    const totalDeRegistros = 
                        parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                        setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
                    setCotizacion(respuesta.data);
                })
        }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                Acciones
                <Button className="btn btn-danger" style={{ marginLeft: '1rem' }} 
                        onClick={() => confirmar(() => `¿Desea Cancelar?`, 'Realizar')}>
                            Borrar</Button>
           {/* <Formik initialValues={valorInicial}
                onSubmit={valores => {
                    valores.pagina = 1;
                    buscarCotizacion(valores)
                }}
            >
                {(formikProps) => (
                <> */}
                <label htmlFor="IdCotizacion" className="sr-only">
                    IdCotización:
                </label>
                <label htmlFor="Vendedor" className="sr-only">
                    Vendendor:
                </label>
                <label htmlFor="Cliente" className="sr-only">
                    Cliente:
                </label>
               {/* <div className="form-group mx-sm-3 mb-2">
                    <select className="form-control"
                        {...formikProps.getFieldProps('tiendaId')}
                    >
                        <option value="0">--Seleccione una tienda--</option>
                            {tienda.map(tienda => <option key={tienda.id}
                                value={tienda.id}>{tienda.nombre}</option>)}
                    </select>
                            </div> */}
                <label htmlFor="Observaciones" className="sr-only">
                    Observaciones:
                </label>
              {/*  <div className="form-group mx-sm-3 mb-2">
                    <select className="form-control"
                        {...formikProps.getFieldProps('ventaId')}
                    >
                        <option value="0">--Seleccione una venta--</option>
                            {venta.map(venta => <option key={venta.id}
                                value={venta.id}>{venta.nombre}</option>)}
                    </select>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <select className="form-control"
                        {...formikProps.getFieldProps('origen')}
                    >
                        <option value="0">--Seleccione un Origen--</option>
                            {origen.map(origen => <option key={origen.id}
                                value={origen.id}>{origen.nombre}</option>)}
                    </select>
                            </div> */}
                <label htmlFor="FormGroupFecha" className="sr-only">
                    Fecha:
                </label>
                <label htmlFor="Estatus" className="sr-only">
                    Estatus:
                </label>
                <div className="collapse navbar-collapse" 
                    style={{display: 'flex', justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    </div>
           {/* </>
             )}
             </Formik> */}
            </div>
            
        </nav>
        <div className="form-group mx-sm-3 mb-2">
        {/*<Field className="form-check-input" id="proximosEstrenos"
            name="proximosEstrenos" type="checkbox" />
            <label className="form-check-label"
            htmlFor="proximosEstrenos">Próximos Estrenos</label> */}
        </div>
             
    </>)
}

{/*interface formularioCotizacionProps{
    modelo: cotizacionCreacionDTO;
    onSubmit(valores: cotizacionCreacionDTO, acciones: FormikHelpers<cotizacionCreacionDTO>): void;
} 
interface filtroCotizacionForm {
    titulo: string;
    ventaId: number;
    tiendaId: number;
    origen: string;
    pagina: number;
    recordsPorPagina: number;
}*/}