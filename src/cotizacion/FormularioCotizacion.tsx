import { Field, Form, Formik, FormikHelpers } from "formik";
import { cotizacionCreacionDTO, cotizacionDTO } from "./cotizacion.model";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Boton from "../utils/Boton";
import { Link, NavLink } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { useContext, useState } from "react";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";
import confirmar from "../utils/Confirmar";
import axios, { AxiosResponse } from "axios";
import { urlCotizacion } from "../utils/endpoints";
import AlertaContext from "../utils/AlertaContext";

export default function FormularioCotizacion(props: formularioCotizacionProps){
    //const construirLink = () => `/cotizacion/${props.modelo.id}`
    const alerta = useContext(AlertaContext)
    function borrarCotizacion(){
        axios.delete(`${urlCotizacion}/${props.modelo.id}`)
            .then(() => {
                alerta();
            })}
    return (
    <>
        <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}
        >
            {formikProps => (
                <Form>
                    <FormGroupFecha campo="fecha" label="fecha" />
                <div className="form-inline">
                    <h4>Acciones</h4>
                    <br />
                    <br />
                    <Boton onClick={() => confirmar(() => borrarCotizacion())}
                            className="btn btn-danger">Borrar</Boton>
                    <div className="container">
                        <div className="left">
                            <div>
                                <h2>Tiktok</h2>
                            </div>
                        </div>
                        <div className="right">
                            <div>
                            <h3>Facebook</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <br />
                        <br />
                        <h2>Probabilidad Venta:</h2>
                                
                        <select className="form-control"
                            //onChange={(e) => {seleccionoEmpresa(e, formikProps)}}
                        >
                            <option value="0">--Seleccione una probabilidad--</option>
                            <option value="1">Muy baja</option>
                            <option value="2">Baja</option>
                            <option value="3">Normal</option>
                            <option value="4">Alta</option>
                                {/* {empresa.map(empresa => <option key={empresa.id}
                                value={empresa.id}>{empresa.nombre}</option>)}*/}
                        </select>
                                
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <h3>Origen: </h3>
                        <select className="form-control">
                            <option value="0">--Seleccione un origen--</option>
                            <option value="1">Mostrador</option>
                            <option value="2">Cliente</option>
                            <option value="3">Administrador</option>
                            <option value="4">Proveedor</option>
                        </select>
                    </div>

                </div>
           </Form> 
           )}
        
        </Formik>

             
    </>
    )
}

interface formularioCotizacionProps{
    modelo: cotizacionDTO;
    onSubmit(valores: cotizacionDTO, acciones: FormikHelpers<cotizacionDTO>): void;
    

   
}