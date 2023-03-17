import { Form, Formik, FormikHelpers } from "formik";
import { cotizacionCreacionDTO } from "./cotizacion.model";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { useState } from "react";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function FormularioCotizacion(props: formularioCotizacionProps){
    

    function mapear(arreglo: {id: number, nombre: string}[]): selectorMultipleModel[]{
        return arreglo.map(valor => {
            return {llave: valor.id, valor:valor.nombre}
        })}

    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={(valores, acciones) => {
                
                props.onSubmit(valores, acciones);
            }}
            validationSchema={Yup.object({
                titulo: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
            })}
        >
            {formikProps => (
                <Form>
                    <FormGroupText label="Nombre" campo="nombre" />
                    <FormGroupCheckbox label="En cines" campo="enCines"  />
                    <FormGroupText label="Trailer" campo="trailer" />
                    <FormGroupFecha campo="fechaLanzamiento" label="Fecha Lanzamiento" />
                    <FormGroupImagen campo="poster" label="Poster" 
                        imagenURL={props.modelo.posterURL} />
                    <FormGroupMarkdown campo="resumen" label="resumen" />

                        
                    
                    <Button disabled={formikProps.isSubmitting} type='submit'>Enviar</Button>
                    <Link className="btn btn-secondary" to="/" >Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface formularioCotizacionProps{
    modelo: cotizacionCreacionDTO;
    onSubmit(valores: cotizacionCreacionDTO, acciones: FormikHelpers<cotizacionCreacionDTO>): void;
}