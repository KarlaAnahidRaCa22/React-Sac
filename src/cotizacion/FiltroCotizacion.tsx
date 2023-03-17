import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../utils/Button";
import { urlCotizacion } from "../utils/endpoints";
import Paginacion from "../utils/Paginacion";
import ListadoCotizacion from "./ListadoCotizacion";
import { cotizacionDTO } from "./cotizacion.model";

export default function FiltroCotizacion(){
    
    const valorInicial: filtroCotizacionForm = {
        nombre: '',
        proximosEstrenos: false,
        enCines: false,
        pagina: 1,
        recordsPorPagina: 10
    }

    
    const [cotizacion, setCotizacion] = useState<cotizacionDTO[]>([]);
  
    const [totalDePaginas, setTotalDePaginas] = useState(0);

    

    useEffect (() => {

      /*  if (query.get('titulo')){
            valorInicial.titulo = query.get('titulo')!;
        }

        if (query.get('generoId')){
            valorInicial.generoId = parseInt(query.get('generoId')!, 10);
        }

        if (query.get('proximosEstrenos')){
            valorInicial.proximosEstrenos = true;
        }

        if (query.get('enCines')){
            valorInicial.enCines = true;
        }

        if (query.get('pagina')){
            valorInicial.pagina = parseInt(query.get('pagina')!, 10);
        } */

        buscarCotizacion(valorInicial);
    }, [])

    function buscarCotizacion(valores: filtroCotizacionForm){
        console.log("Estos son los valores 1: ", valores)
      //  modificarURL(valores);
        axios.get(`${urlCotizacion}/filtrar`, {params: valores})
            .then((respuesta: AxiosResponse<cotizacionDTO[]>) => { 
                const totalDeRegistros = 
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                    setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
                setCotizacion(respuesta.data);
            })
    }

  /* function modificarURL(valores: filtroCotizacionForm){
    console.log("Estos son los valores: ", valores)
        const queryStrings: string[] = [];
        if (valores.titulo){
            queryStrings.push(`titulo=${valores.titulo}`);
        }

        if (valores.generoId !== 0){
            queryStrings.push(`generoId=${valores.generoId}`);
        }

        if (valores.proximosEstrenos){
            queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
        }

        if (valores.enCines){
            queryStrings.push(`enCines=${valores.enCines}`);
        }

        queryStrings.push(`pagina=${valores.pagina}`);
        //titulo=ivan&pagina=28&...
        history.push(`/cotizacion/filtrar?${queryStrings.join('&')}`)
    }
*/
    return(
        <>
            <h3>Filtrar Cotizacion</h3>

            <Formik initialValues={valorInicial}
                    onSubmit={valores => {
                        valores.pagina = 1;
                        buscarCotizacion(valores)
                    }}
            >
                {(formikProps) => (
                    <>
                        <Form>
                        <div className="form-inline">
                            <div className="form-group mb-2">
                                <label htmlFor="nombre" className="sr-only">
                                    Nombre
                                </label>
                                <input type="text" 
                                        className="form-control" id="nombre"
                                        placeholder="Nombre de la cotizacion"
                                        {...formikProps.getFieldProps('nombre')}
                                />
                            </div>
                            
                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="proximosEstrenos"
                                    name="proximosEstrenos" type="checkbox" />
                                    <label className="form-check-label"
                                    htmlFor="proximosEstrenos">Próximos Estrenos</label>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="enCines"
                                    name="enCines" type="checkbox" />
                                <label className="form-check-label"
                                    htmlFor="enCines">En Cines</label>
                            </div>
                            <Button
                                className="btn btn-primary mb-2 mx-sm-3"
                                onClick={() => formikProps.submitForm()}
                            >Filtrar</Button>
                            <Button
                                className="btn btn-danger mb-2"
                                onClick={() => { 
                                    formikProps.setValues(valorInicial);
                                    buscarCotizacion(valorInicial)
                                }}
                            >Limpiar</Button>
                        </div>
                        </Form>

                        <ListadoCotizacion cotizacion={cotizacion} />
                            <Paginacion cantidadTotalDePaginas={totalDePaginas}
                                paginaActual={formikProps.values.pagina}
                                onChage={nuevaPagina => {
                                    formikProps.values.pagina = nuevaPagina;
                                    buscarCotizacion(formikProps.values);
                                }} />
                    </>
                )}
            </Formik>

            
        </>
    )
}

interface filtroCotizacionForm {
    nombre: string;
    proximosEstrenos: boolean;
    enCines: boolean;
    pagina: number;
    recordsPorPagina: number;
}