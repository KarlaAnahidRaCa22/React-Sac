import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { usuarioDTO } from "../auth/auth.model";
import Boton from "../utils/Boton";
import { urlCuentas, urlEmpresa, urlEmpresaUsuario } from "../utils/endpoints";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";
import FormGroupText from "../utils/FormGroupText";
import { selectorMultipleModel } from "../utils/SelectorMultiple";
import { empresaDTO, empresaUsuario, empresaUsuarioCreacionDTO } from "./empresaUsuario.model";
import IndiceVendedor from "../vendedor/IndiceVendedor";
import IndiceEmpresa from "./IndiceEmpresa";
import IndiceUsuario from "../auth/IndiceUsuario";
import { clienteDTO } from "../cotizacion/cotizacion.model";

export default function FormularioEmpresaUsuario(props: formularioEmpresaUsuarioProps){

  {/* const valorInicial: formularioEmpresaUsuarioProps = {
        modelo = {props.modelo},
        onSubmit = {props.onSubmit},
       empresaId: 0,
       UsuarioId: '',
       
   } */}

    const [empresa, setEmpresa] = useState<empresaDTO[]>([]);
    const [usuario, setUsuario] = useState<usuarioDTO[]>([]);
    
    const seleccionoUsuario = (e: any, formikProps: FormikProps<empresaUsuarioCreacionDTO>) => {
        console.log(e.target.value)
        console.log(formikProps)
        formikProps.setFieldValue("usuarioId", e.target.value)
    }

    function seleccionoEmpresa(e: any, formikProps: FormikProps<empresaUsuarioCreacionDTO>) {
        console.log(e.target.value)
        console.log(formikProps)
        formikProps.setFieldValue("empresaId", e.target.value)
    }
    
   
    useEffect(() => {
        axios.get(`${urlEmpresa}/todos`)
        .then((respuesta: AxiosResponse<empresaDTO[]>) => {
            setEmpresa(respuesta.data);
        })
        axios.get(`${urlCuentas}/todos`)
        .then((respuesta: AxiosResponse<usuarioDTO[]>) => {
            setUsuario(respuesta.data);
        })
    }, [])
    
    

    return (
        <>
            
            <Formik initialValues={props.modelo}
                onSubmit={props.onSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <div>
                            <div className="form-group mx-sm-3 mb-2">
                                <br />
                                <br />
                                <h2>Empresa:</h2>
                                
                                <select className="form-control"
                                    onChange={(e) => {seleccionoEmpresa(e, formikProps)}}
                                >
                                    <option value="0">--Seleccione una empresa--</option>
                                    {empresa.map(empresa => <option key={empresa.id}
                                        value={empresa.id}>{empresa.nombre}</option>)}
                                </select>
                            </div>
                            <br />
                            <Boton disabled={formikProps.isSubmitting} type="submit" >Conectar</Boton>{"      "}
                            <Link className="btn btn-danger" to="/" >Cancelar</Link>
                            <br />
                            <br />
                            <div className="form-group mx-sm-3 mb-2">
                                <h2>Usuario:</h2>
                                <select className="form-control"
                                    onChange={(e) => {seleccionoUsuario(e, formikProps)}}
                                >
                                    <option value="0">--Seleccione un usuario--</option>
                                    {usuario.map(usuario => <option key={usuario.id}
                                        value={usuario.id}>{usuario.email}</option>)}
                                </select>
                            </div>
                        </div>
                    </Form>
                )}

                                    </Formik>
            
            
        </>
    ) 
                    }

interface formularioEmpresaUsuarioProps{
    modelo: empresaUsuarioCreacionDTO;
    onSubmit(valores: empresaUsuarioCreacionDTO, acciones: FormikHelpers<empresaUsuarioCreacionDTO>): void;
    empresaId: number;
    UsuarioId: string;

   
}