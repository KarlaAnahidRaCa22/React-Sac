import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Boton from "../utils/Boton";
import { urlCotizacion } from "../utils/endpoints";
import Paginacion from "../utils/Paginacion";
import ListadoCotizacion from "./ListadoCotizacion";
import {
  articulosDTO,
  clienteDTO,
  cotizacionDTO,
  vendedorDTO,
  ventaDTO,
} from "./cotizacion.model";
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
import { error, log, table } from "console";
import IndiceEntidad from "../utils/IndiceEntidad";
import { isNoSubstitutionTemplateLiteral } from "typescript";

export default function FiltroCotizacion() {
  const [vendedores, setVendedores] = useState<vendedorDTO[]>([]);
  const [tablaVendedores, setTablaVendedores] = useState<vendedorDTO[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState<clienteDTO[]>([]);
  const [tablaClientes, setTablaClientes] = useState<clienteDTO[]>([]);
  const [busqueda1, setBusqueda1] = useState("");
  const [articulos, setArticulos] = useState<articulosDTO[]>([]);
  const [tablaArticulos, setTablaArticulos] = useState<articulosDTO[]>([]);
  const [busqueda2, setBusqueda2] = useState("");
  const [venta, setVenta] = useState<ventaDTO[]>([]);
  const [ventas, setVentas] = useState<ventaDTO[]>([]);
  const [cotizacion, setCotizacion] = useState<cotizacionDTO[]>([]);

  const [Subtotal, setSubtotal] = useState(0);

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

  const peticionGet2 = async () => {
    await axios
      .get(`${urlCotizacion}/Articulos`)
      .then((response) => {
        setArticulos(response.data);
        setTablaArticulos(response.data);
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

  const handleChange2 = (e: any) => {
    setBusqueda2(e.target.value);
    filtrarArticulos(e.target.value);
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

  const filtrarArticulos = (terminoBusqueda: any) => {
    var resultadosBusqueda2 = tablaArticulos.filter((elemento) => {
      if (
        elemento.clave_art
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.desc_art
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setArticulos(resultadosBusqueda2);
  };

  useEffect(() => {
    peticionGet();
    peticionGet1();
    peticionGet2();
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

  const valorInicial: filtroCotizacionForm = {
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

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

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

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
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

  /*
    Resultado: 1/27/2020
*/

  //const ref = useRef(null);
  const inputRef = useRef(null);
  const labelRef = useRef(null);

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

  const [ArticuloSeleccionado, setArticuloSeleccionado] = useState("");
  const [ventaActuals, setVentaActuals] = useState<ventaDTO>();
  let ventaActual: ventaDTO = {
    cantidad: 0,
    clave: "0",
    articulo: "0",
    precio: 0,
    porciento_descuento: 0,
    importe_descuento: 0,
    total: 0,
  };

  function handleRowClickOnTableArticulo(e: articulosDTO) {
    console.log("Mande de data: ", e);

    setArticuloSeleccionado(e.desc_art);
    let cantidades: any = "1";
    try {
      cantidades = $("#cant").val();
    } catch {}
    let claves = e.clave_art;
    let productos = e.desc_art;
    let precios = e.precio_base_compra;
    let total = precios * parseInt(cantidades);
    let venta: ventaDTO = {
      cantidad: cantidades,
      clave: claves,
      articulo: productos,
      precio: precios,
      porciento_descuento: 0,
      importe_descuento: 0,
      total: total,
    };

    setVentaActuals(venta);
    ventaActual = venta;
    setOpen3(true);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();

      ventaActual = ventaActuals!;
      ventaActual.cantidad = event.target.value;
      let totals = ventaActual.precio * ventaActual.cantidad;
      ventaActual.total = totals;

      setVentas([...ventas, ventaActual]);
      setOpen3(false);
      setOpen2(false);
    }
  };

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
            <Form action="VistaCotizacion.tsx" method="post">
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
                      id="idCotizaciones"
                      style={{ width: "230px" }}
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
                                          handleRowClickOnTableCliente(cliente);
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

                  <div className="tienda" style={{ width: "220px" }} >
                    <div style={{ width: "100px" }}>Tienda:</div>
                    <select className="form-control" id="idTienda">
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
                      id="idObservaciones"
                      placeholder=""
                      {...formikProps.getFieldProps("observaciones")}
                      style={{ width: "900px" }}
                    />
                  </div>
                  <div className="pre">Precio2:</div>
                  <div className="fecha" style={{ width: "200px" }}>
                    Fecha:
                    {año}
                  </div>
                </div>

                <div className="roww">
                  <div className="probabilidadVenta" style={{ width: "400px" }}>
                    <div style={{ width: "220px" }}>Probabilidad Venta</div>
                    <select className="form-control" id="idProbabilidadVenta">
                      <option value="0">Muy Baja</option>
                      <option value="1">Baja</option>
                      <option value="2">Normal</option>
                      <option value="3">Alta</option>
                    </select>
                  </div>
                  <div className="origen" style={{ width: "300px" }}>
                    <div style={{ width: "70px" }}>Origen</div>
                    <select className="form-control" id="idOrigen">
                      <option value="0">Mostrador</option>
                      <option value="1">Cliente</option>
                      <option value="2">Administrador</option>
                      <option value="3">Proveedor</option>
                    </select>
                  </div>
                  <div className="estatus">Estatus</div>
                </div>

                <div className="tabla">
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Cantidad</th>
                        <th>Clave</th>
                        <th>Articulo</th>
                        <th>Precio</th>
                        <th>% Descuento</th>
                        <th>$ Descuento</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas &&
                        ventas.map((venta) => (
                          <tr key={venta.clave}>
                            <td>{venta.cantidad}</td>
                            <td>{venta.clave}</td>
                            <td>{venta.articulo}</td>
                            <td>{venta.precio}</td>
                            <td>{venta.porciento_descuento}</td>
                            <td>{venta.importe_descuento}</td>
                            <td>{venta.total}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="footer">
                  <div className="columnas">
                    <label
                      onClick={handleClickOpen2}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Articulo
                    </label>
                    <Dialog
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="form-dialog-tittle2"
                      data-bs-target="#form-dialog-tittle"
                    >
                      <DialogTitle id="form-dialog-tittle2">
                        Articulos
                      </DialogTitle>
                      <DialogContent>
                        <div className="containerInput">
                          <input
                            className="form-control inputBuscar"
                            value={busqueda2}
                            placeholder="Buscar..."
                            onChange={handleChange2}
                          />
                          {open2 && (
                            <div className="table-responsive" id="tabla2">
                              <table className="table table-sm table-bordered">
                                <thead>
                                  <tr>
                                    <th>Clave</th>
                                    <th>Articulo</th>
                                    <th>Precio</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {articulos &&
                                    articulos.map((articulo) => (
                                      <tr
                                        key={articulo.clave_art}
                                        onClick={(e) => {
                                          handleRowClickOnTableArticulo(
                                            articulo
                                          );
                                        }}
                                      >
                                        <td id="clave">{articulo.clave_art}</td>
                                        <td id="articulo">
                                          {articulo.desc_art}
                                        </td>
                                        <td id="precio">
                                          {articulo.precio_base_compra}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={open3}
                      onClose={handleClose3}
                      aria-labelledby="form-dialog-tittle2"
                      data-bs-target="#form-dialog-tittle"
                    >
                      <DialogTitle>Cantidad</DialogTitle>
                      <DialogContent>
                        <input
                          id="cant"
                          type="text"
                          ref={inputRef}
                          className="form-control"
                          title="Cantidad"
                          placeholder="Cantidad..."
                          onKeyDown={handleKeyDown}
                        ></input>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>

                    
                  </div>
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
                    value={ventas.reduce((prev, curr) => prev + curr.total, 0)}
                    type="text"
                    className="form-control"
                    id="subtotal"
                    style={{ width: "220px" }}
                    placeholder="$0.00"
                  />
                </div>
              </div>

              <div
                className="cotizaciones"
                style={{ backgroundColor: "#E0E0E0", marginTop: "330px" }}
                
              >
                <Button
                  onClick={handleClickOpen4}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    alignContent: "center",
                  }}
                >
                  Generar (F12)
                </Button>
                
                <Dialog
                  open={open4}
                  onClose={handleClose4}
                  aria-labelledby="form-dialog-tittle4"
                  data-bs-target="#form-dialog-tittle"
                  fullScreen
                  
                >
                  
                  <DialogContent >
                    <div className="containerInput" >
                      <div className="modal-fullscreen">
                      <div>
                        <div style={{width:'98vw', textAlign:'center', fontSize:'25px'}}><label>Cotización</label></div>
                        <img
                          src={evolsoft}
                          style={{
                            width: "150px",
                            right: "20px",
                            marginTop: "09px",
                          }}
                        />
                        <div className="idCotizacion" style={{}}><label>Cotización: </label></div>
                        <div className="fecha1" style={{width:'98vw', textAlign:'end'}}><label>Fecha: {año}</label></div>
                        <hr />
                        <div className="Clientes">
                          Cliente: {ClienteSeleccionado}
                        </div>
                        <hr />
                        <div className="Vendedores">
                          Vendedor: {VendedorSeleccionado}
                        </div>
                        <hr />
                      </div>
                      {open4 && (
                        <div className="table-responsive" id="tabla4">
                          <table className="table table-sm table-bordered">
                            <thead>
                              <tr>
                                <th>Cantidad</th>
                                <th>Clave</th>
                                <th>Articulo</th>
                                <th>Precio</th>
                                <th>% Descuento</th>
                                <th>$ Descuento</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ventas &&
                                ventas.map((venta) => (
                                  <tr key={venta.clave}>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.clave}</td>
                                    <td>{venta.articulo}</td>
                                    <td>{venta.precio}</td>
                                    <td>{venta.porciento_descuento}</td>
                                    <td>{venta.importe_descuento}</td>
                                    <td>{venta.total}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          
                        </div>

                      )}
                      
                     <div className="observaciones" style={{width: '50px'}}><label> Observaciones: </label></div> 
                    </div></div>
                    <div className="subtotal2" style={{width:'98vw', textAlign:'end', fontSize:'50px'}}>
                      <label> Subtotal: {ventas.reduce((prev, curr) => prev + curr.total, 0)}</label>
                    </div>
                  </DialogContent>
                </Dialog>
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
