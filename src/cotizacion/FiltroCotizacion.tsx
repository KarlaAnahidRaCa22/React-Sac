import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Boton from "../utils/Boton";
import { urlCotizacion } from "../utils/endpoints";
import Paginacion from "../utils/Paginacion";
import ListadoCotizacion from "./ListadoCotizacion";
import { clienteDTO, cotizacionDTO, vendedorDTO } from "./cotizacion.model";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import "./FiltroCotizacion.css";
import FormGroupFecha from "../utils/FormGroupFecha";
import { useAttribution } from "@react-leaflet/core";
import confirmar from "../utils/Confirmar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import TextField from "@material-ui/core/TextField";
import evolsoft from "../img/evolsoft.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IndiceVendedor from "../vendedor/IndiceVendedor";
import { table } from "console";
import IndiceEntidad from "../utils/IndiceEntidad";

export default function FiltroCotizacion() {

  
  const [vendedores, setVendedores] = useState<vendedorDTO[]>([]);
  const [tablaVendedores, setTablaVendedores] = useState<vendedorDTO[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState<clienteDTO[]>([]);
  const [tablaClientes, setTablaClientes] = useState<clienteDTO[]>([]);
  const [busqueda1, setBusqueda1] = useState("");

  const peticionGet = async () => {
    await axios
      .get(`${urlCotizacion}/listadoVendedor`)
      .then((response) => {
        setVendedores(response.data);
        setTablaVendedores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionGet1 = async () => {
    await axios
      .get(`${urlCotizacion}/listadoClientes`)
      .then((response) => {
        setClientes(response.data);
        setTablaClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: any) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const handleChange1 = (e: any) => {
    setBusqueda1(e.target.value);
    filtrarClientes(e.target.value);
  };

  const filtrar = (terminoBusqueda: any) => {
    var resultadosBusqueda = tablaVendedores.filter((elemento) => {
      if (
        elemento.nombre_usuario
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.clave_usuario
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setVendedores(resultadosBusqueda);
  };

  const filtrarClientes = (terminoBusqueda: any) => {
    var resultadosBusqueda1 = tablaClientes.filter((elemento) => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.clave_cte
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setClientes(resultadosBusqueda1);
  };

  useEffect(() => {
    peticionGet();
    peticionGet1();
  }, []);

  
  /*function seleccionoVendedor(e: any, formikProps: FormikProps<vendedorDTO>) {
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
*/

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const valorInicial: filtroCotizacionForm = {
    nombre: "",
    //enviarCotEmail: false,
    pagina: 1,
    recordsPorPagina: 10,
    clave_usuario: [],
    nombre_usuario: [],
  };
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  useEffect(() => {
    buscarVendedor(valorInicial);
  }, []);

  function buscarVendedor(valores: filtroCotizacionForm) {
    console.log("Estos son los valores 1: ", valores);
    //  modificarURL(valores);
    axios
      .get(`${urlCotizacion}/listadoVendedor`, { params: valores })
      .then((respuesta: AxiosResponse<vendedorDTO[]>) => {
        const totalDeRegistros = parseInt(
          respuesta.headers["cantidadtotalregistros"],
          10
        );
        setTotalDePaginas(
          Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina)
        );
        setVendedores(respuesta.data);
      });
  }

  //let today = new Date()

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  // crea un nuevo objeto `Date`
  var today = new Date();

  // `getDate()` devuelve el día del mes (del 1 al 31)
  var day = today.getDate();

  // `getMonth()` devuelve el mes (de 0 a 11)
  var month = today.getMonth() + 1;

  // `getFullYear()` devuelve el año completo
  var year = today.getFullYear();

  // muestra la fecha de hoy en formato `MM/DD/YYYY`
  //console.log(`${day}/${month}/${year}`);

  var año = `${day}/${month}/${year}`;
  console.log(año);
  /*
    Resultado: 1/27/2020
*/

  const [cotizacion, setCotizacion] = useState<cotizacionDTO[]>([]);

  useEffect(() => {}, []);

  const [VendedorSeleccionado, setVendedorSeleccionado] = useState("");

  function handleRowClickOnTableVendedor(e: vendedorDTO) {
    console.log("Esta es la data que mande: ", e);
    setVendedorSeleccionado(e.nombre_usuario);
    setOpen(false);
  }

  const [ClienteSeleccionado, setClienteSeleccionado] = useState("");

  function handleRowClickOnTableCliente(e: clienteDTO) {
    console.log("Lo mande de la data: ", e);
    setClienteSeleccionado(e.nombre);
    setOpen1(false);
  }

  return (
    <>
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarVendedor(valores);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div
                className="containerr"
                style={{ backgroundColor: "#E0E0E0" }}
              >
                <div className="rows">
                  <div className="accion">
                    <h5 style={{ textAlign: "center" }}>Acciones</h5>
                  </div>
                  <div className="idCotizacion">
                    IdCotizaciones:
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      style={{ width: "230px" }}
                      placeholder="Nombre de la cotizacion"
                      {...formikProps.getFieldProps("nombre")}
                    />
                  </div>
                  <div className="vendedor">
                    <label
                      onClick={handleClickOpen}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Vendedor:
                    </label>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-tittle"
                    >
                      <DialogTitle id="form-dialog-tittle">
                        <div>Vendedor</div>
                      </DialogTitle>
                      <DialogContent>
                        <div className="containerInput">
                          <input
                            className="form-control inputBuscar"
                            value={busqueda}
                            placeholder="Buscar..."
                            onChange={handleChange}
                          />

                          {open && (
                            <div className="table-responsive" id="tabla">
                              <table className="table table-sm table-bordered">
                                <thead>
                                  <tr>
                                    <th>clave_usuario</th>
                                    <th>nombre_usuario</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vendedores &&
                                    vendedores.map((vendedor) => (
                                      <tr
                                        key={vendedor.clave_usuario}
                                        onClick={(e) => {
                                          handleRowClickOnTableVendedor(
                                            vendedor
                                          );
                                        }}
                                      >
                                        <td>{vendedor.clave_usuario}</td>
                                        <td>{vendedor.nombre_usuario}</td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>
                    <input
                      type="text"
                      id="tbVendedor"
                      value={VendedorSeleccionado}
                    ></input>
                  </div>

                  <div className="cliente">
                    <label
                      onClick={handleClickOpen1}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Clientes:
                    </label>
                    <Dialog
                      open={open1}
                      onClose={handleClose1}
                      aria-labelledby="form-dialog-tittle"
                    >
                      <DialogTitle id="form-dialog-tittle">
                        <div>Cliente</div>
                      </DialogTitle>
                      <DialogContent>
                        <div className="containerInput">
                          <input
                            className="form-control inputBuscar"
                            value={busqueda1}
                            placeholder="Buscar..."
                            onChange={handleChange1}
                          />
                          {open1 && (
                            <div className="table-responsive" id="tabla">
                              <table className="table table-sm table-bordered">
                                <thead>
                                  <tr>
                                    <th>clave_cte</th>
                                    <th>nombre</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {clientes &&
                                    clientes.map((cliente) => (
                                      <tr
                                        key={cliente.clave_cte}
                                        onClick={(e) => {
                                          handleRowClickOnTableCliente(
                                            cliente
                                          );
                                        }}
                                      >
                                        <td>{cliente.clave_cte}</td>
                                        <td>{cliente.nombre}</td>
                                      </tr>
                                    ))}
                                    
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>
                    <input
                      type="text"
                      id="tbCliente"
                      value={ClienteSeleccionado}
                    ></input>
                  </div>

                  <div className="tienda" style={{ width: "220px" }}>
                    <div style={{ width: "100px" }}>Tienda:</div>
                    <select className="form-control">
                      <option value="0">MATRIZ</option>
                      <option value="1">SUCURSAL </option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="borrar" style={{ right: "10px" }}>
                    <Boton
                      className="btn btn-danger mx-sm-2 mb-2"
                      onClick={() =>
                        confirmar(
                          () => `¿Desea borrar la cotizacion?`,
                          "¿Desea borrar la cotizacion?"
                        )
                      }
                    >
                      Borrar
                    </Boton>
                  </div>
                  <div className="observaciones">
                    Observaciones:
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder=""
                      {...formikProps.getFieldProps("nombre")}
                      style={{ width: "900px" }}
                    />
                  </div>
                  <div className="pre">Precio2:</div>
                  <div className="fecha" style={{ width: "200px" }}>
                    Fecha:
                    {/*today.toString()*/}
                    {año}
                  </div>
                </div>

                <div className="roww">
                  <div className="probabilidadVenta" style={{ width: "400px" }}>
                    <div style={{ width: "220px" }}>Probabilidad Venta</div>
                    <select className="form-control">
                      <option value="0">Muy Baja</option>
                      <option value="1">Baja</option>
                      <option value="2">Normal</option>
                      <option value="3">Alta</option>
                    </select>
                  </div>
                  <div className="origen" style={{ width: "300px" }}>
                    <div style={{ width: "70px" }}>Origen</div>
                    <select className="form-control">
                      <option value="0">Mostrador</option>
                      <option value="1">Cliente</option>
                      <option value="2">Administrador</option>
                      <option value="3">Proveedor</option>
                    </select>
                  </div>
                  <div className="estatus">Estatus</div>
                </div>

                <div className="tabla">
                  <div className="columna">Cantidad</div>
                  <div className="columna">Clave</div>
                  <div className="columna">Articulo</div>
                  <div className="columna">Precio</div>
                  <div className="columna">% Descuento</div>
                  <div className="columna">$ Descuento</div>
                  <div className="columna">Subtotal</div>
                </div>

                <div className="footer">
                  <div className="columnas">Articulo:</div>
                </div>
              </div>

              <div className="logo">
                <img
                  src={evolsoft}
                  style={{ width: "350px", right: "350px", marginTop: "50px" }}
                />
              </div>
              <br />
              <br />
              <div className="subtotal" style={{ marginTop: "230px" }}>
                <div className="subtotals">
                  <h1>SUBTOTAL:</h1>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    style={{ width: "220px" }}
                    placeholder="$0.00"
                    {...formikProps.getFieldProps("nombre")}
                  />
                </div>
              </div>

              <div
                className="boton"
                style={{ backgroundColor: "greenyellow", marginTop: "330px" }}
              >
                <Boton
                  onClick={() => {
                    formikProps.setValues(valorInicial);
                    //buscarCotizacion(valorInicial);
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} beat /> {"          "}
                  Generar (F12)
                </Boton>
              </div>
              <div
                className="casilla"
                style={{ float: "left", width: "20%", marginTop: "350px" }}
              >
                <Field
                  className="form-check-input"
                  id="enviarCotizacion"
                  name="enviarCotizacion"
                  type="checkbox"
                />
                <label className="form-check-label" htmlFor="enviarCotizacion">
                  Enviar cotizacion por correo electrónico
                </label>
              </div>

              {/*  <div className="">
                        <div className="form-inline">
                          <Button className="btn btn-danger mx-sm-2 mb-2"
                                onClick={() => { 
                                    formikProps.setValues(valorInicial);
                                    buscarCotizacion(valorInicial)
                                }}
                            >Borrar</Button> 
                            <h6>Acciones</h6> 
                            
                           
                            
                            <div className="form-group mx-sm-1 mb-1">
                                <h6>IdCotizaciones: </h6>
                                <input type="text" 
                                    className="form-control" id="nombre"
                                    placeholder="Nombre de la cotizacion"
                                    {...formikProps.getFieldProps('nombre')}
                                />
                            </div>
                            
                            <div className="form-group mx-sm-1 mb-1">
                                <h6>Vendedor: </h6>
                                <input type="text" 
                                    className="form-control" id="nombre"
                                    placeholder="Nombre de la cotizacion"
                                    {...formikProps.getFieldProps('nombre')}
                                />
                            </div>
                            
                            <div className="form-group mx-sm-1 mb-1">
                                <h6>Cliente: </h6>
                                <input type="text" 
                                    className="form-control" id="nombre"
                                    placeholder="Nombre de la cotizacion"
                                    {...formikProps.getFieldProps('nombre')}
                                />
                            </div>
                            
                            <div className="form-group mx-sm-1 mb-1">
                                <h6>Tienda: </h6>
                                <input type="text" 
                                    className="form-control" id="nombre"
                                    placeholder="Nombre de la cotizacion"
                                    {...formikProps.getFieldProps('nombre')}
                                />
                            </div>
                        </div>
                        </div>
                        <div className="navbar navbar-expand navbar-light bg-light">
                        <div className="form-inline">
                        <div className="form-group mx-sm-1 mb-1">
                                <h6>Observaciones: </h6>
                                <input type="text" 
                                    className="form-control" id="nombre"
                                    placeholder="Nombre de la cotizacion"
                                    {...formikProps.getFieldProps('nombre')}
                                />
                        </div>
                            <div>
                                Precio2: 
                                <input type="date"
                                    className="form-control" id="fecha"
                                    placeholder="fecha"
                                    {...formikProps.getFieldProps('fecha')}
                                />
                            </div>
                            </div>
                            </div>
                        <div className="navbar navbar-expand navbar-light bg-light">
                        <div className="form-inline">
                            <div className="form-group">
                        <br />
                        <br />
                        <h6>Probabilidad Venta</h6>
                                
                        <select className="form-control"
                            //onChange={(e) => {seleccionoEmpresa(e, formikProps)}}
                        >
                            <option value="0">--Seleccione una probabilidad--</option>
                            <option value="1">Muy baja</option>
                            <option value="2">Baja</option>
                            <option value="3">Normal</option>
                            <option value="4">Alta</option>
                                {/* {empresa.map(empresa => <option key={empresa.id}
                                value={empresa.id}>{empresa.nombre}</option>)}
                        </select>
                                
                    </div>
                    <div className="form-group">
                        <h6>Origen: </h6>
                        <select className="form-control">
                            <option value="0">--Seleccione un origen--</option>
                            <option value="1">Mostrador</option>
                            <option value="2">Cliente</option>
                            <option value="3">Administrador</option>
                            <option value="4">Proveedor</option>
                        </select>
                    </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="enviarCotEmail"
                                    name="enviarCotEmail" type="checkbox" />
                                    <label className="form-check-label"
                                    htmlFor="enviarCotEmail">Enviar cotización por correo electrónico</label>
                            </div>
                            </div>
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
                        */}
            </Form>

            {/* <ListadoCotizacion cotizacion={cotizacion} />
                            <Paginacion //cantidadTotalDePaginas={totalDePaginas}
                                paginaActual={formikProps.values.pagina}
                                onChage={nuevaPagina => {
                                    formikProps.values.pagina = nuevaPagina;
                                    buscarCotizacion(formikProps.values);
                                } } cantidadTotalDePaginas={0} /> */}
          </>
        )}
      </Formik>

      {/* </ul>
            </div>
            </div>
            </nav>*/}
    </>
  );
}

interface filtroCotizacionForm {
  nombre: string;
  //enviarCotEmail: boolean;
  pagina: number;
  recordsPorPagina: number;
  clave_usuario: vendedorDTO[];
  nombre_usuario: vendedorDTO[];
}

/*interface filtroVendedorForm {
  clave_usuario: vendedorDTO[];
  nombre_usuario: vendedorDTO[];
}
*/
