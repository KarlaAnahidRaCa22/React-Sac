import { useEffect, useState } from "react";
import { vendedorDTO } from "../cotizacion/cotizacion.model";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import axios, { AxiosResponse } from "axios";
import { urlCotizacion } from "../utils/endpoints";
import Boton from "../utils/Boton";
import { Link } from "react-router-dom";
import TypeAheadVendedor from "./TypeAheadVendedor";

export default function FormularioVendedor(props: formularioVendedorProps) {
  {
    /* const valorInicial: formularioEmpresaUsuarioProps = {
          modelo = {props.modelo},
          onSubmit = {props.onSubmit},
         empresaId: 0,
         UsuarioId: '',
         
     } */
  }

  const [vendedor, setVendedor] = useState<vendedorDTO[]>([]);
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState<
    vendedorDTO[]
  >(props.vendedorSeleccionado);

  function seleccionoVendedor(e: any, formikProps: FormikProps<vendedorDTO>) {
    console.log(e.target.value);
    console.log(formikProps);
    formikProps.setFieldValue("clave_usuario", e.target.value);
  }

  useEffect(() => {
    axios
      .get(`${urlCotizacion}/listadoVendedor`)
      .then((respuesta: AxiosResponse<vendedorDTO[]>) => {
        setVendedor(respuesta.data);
      });
  }, []);

  return (
    <>
      <Formik initialValues={props.modelo} onSubmit={props.onSubmit}>
        {(formikProps) => (
          <Form>
            <div className="form-group">
              <TypeAheadVendedor
                onAdd={(vendedores) => {
                  setVendedorSeleccionado(vendedores);
                }}
                onRemove={(vendedor) => {
                  const vendedores = vendedorSeleccionado.filter(
                    (x) => x !== vendedor
                  );
                  setVendedorSeleccionado(vendedores);
                }}
                vendedor={vendedorSeleccionado}
                listadoUI={(vendedor: vendedorDTO) => (
                  <>{vendedor.nombre_usuario}</>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface formularioVendedorProps {
  modelo: vendedorDTO;
  onSubmit(valores: vendedorDTO, acciones: FormikHelpers<vendedorDTO>): void;
  clave_usuario: number;
  nombre_usuario: string;
  vendedorSeleccionado: vendedorDTO[];
}
