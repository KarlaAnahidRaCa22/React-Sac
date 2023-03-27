import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { usuarioDTO } from "../auth/auth.model";
import Button from "../utils/Button";
import { urlCuentas, urlEmpresa, urlEmpresaUsuario } from "../utils/endpoints";
import FormGroupText from "../utils/FormGroupText";
import { selectorMultipleModel } from "../utils/SelectorMultiple";
import { empresaDTO, empresaUsuarioCreacionDTO } from "./empresaUsuario.model";

export default function FormularioEmpresaUsuario(){

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(empresaUsuario:empresaUsuarioCreacionDTO) {
        try{
            await axios.post(urlEmpresaUsuario, empresaUsuario);
            history.push('/empresaUsuario')
        }
        catch (error){
            setErrores(error.response.data);
        }
    }
    const valorInicial: formularioEmpresaUsuarioForm = {
        empresaId: 0,
        usuarioId: ''
    }

    const [empresa, setEmpresa] = useState<empresaDTO[]>([]);
    const [usuario, setUsuario] = useState<usuarioDTO[]>([]);
    
    useEffect(() => {
        axios.get(`${urlEmpresa}/todos`)
        .then((respuesta: AxiosResponse<empresaDTO[]>) => {
            setEmpresa(respuesta.data);
        })
    }, [])
    useEffect(() => {
        axios.get(`${urlCuentas}/todos`)
        .then((respuesta: AxiosResponse<usuarioDTO[]>) => {
            setUsuario(respuesta.data);
        })
    }, [])
    return (
        <>
            <h1>Empresa Usuario</h1>

            <Formik initialValues={valorInicial}
                onSubmit={valores => console.log(valores)}
            >
                {(formikProps) => (
                    <Form>
                        <div>
                            <div className="form-group mx-sm-3 mb-2">
                                <br />
                                <br />
                                <h2>Empresa:</h2>
                                
                                <select className="form-control"
                                    {...formikProps.getFieldProps('empresaId')}
                                >
                                    <option value="0">--Seleccione una empresa--</option>
                                    {empresa.map(empresa => <option key={empresa.id}
                                        value={empresa.id}>{empresa.nombre}</option>)}
                                </select>
                            </div>
                            <br />
                            <Button disabled={formikProps.isSubmitting} type="submit" >Conectar</Button>
                            <Link className="btn btn-secondary" to="/" >Cancelar</Link>
                            <br />
                            <br />
                            <div className="form-group mx-sm-3 mb-2">
                                <h2>Usuario:</h2>
                                <select className="form-control"
                                    {...formikProps.getFieldProps('usuarioId')}
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

interface formularioEmpresaUsuarioForm{
    empresaId: number;
    usuarioId: string;
}