import { Form, Formik, FormikHelpers } from "formik";
import { credencialesUsuario } from "./auth.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Boton from "../utils/Boton";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core";

export default function FormularioAuth(props: formularioAuthProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Este campo es requerido")
          .email("Debe colocar un email válido"),
        password: Yup.string()
              .required("Este campo es requerido"),
      })}
    >
      {(formikProps) => (
        <Form style={{ fontFamily: "cursive", fontSize: "25px", width:'350px', marginLeft:'500px', overflow:'hidden'  }}>
          <h1>SACWEB</h1>
          <br />
          <br />
          <FormGroupText label="Email" campo="email" />
          <FormGroupText label="Password" campo="password" type="password" />

          <Boton disabled={formikProps.isSubmitting} type="submit">
            Enviar
          </Boton>
          <Link className="btn btn-secondary" to="/">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formularioAuthProps {
  modelo: credencialesUsuario;
  onSubmit(
    valores: credencialesUsuario,
    acciones: FormikHelpers<credencialesUsuario>
  ): void;
}
