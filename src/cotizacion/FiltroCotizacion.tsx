import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Boton from "../utils/Boton";
import { urlCotizacion } from "../utils/endpoints";
import Paginacion from "../utils/Paginacion";
import ListadoCotizacion from "./ListadoCotizacion";
import { cotizacionDTO } from "./cotizacion.model";
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

export default function FiltroCotizacion() {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const valorInicial: filtroCotizacionForm = {
    nombre: "",
    //enviarCotEmail: false,
    pagina: 1,
    recordsPorPagina: 10,
  };

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
  //var today = new Date();

  // `getDate()` devuelve el día del mes (del 1 al 31)
  //var day = today.getDate();

  // `getMonth()` devuelve el mes (de 0 a 11)
  //var month = today.getMonth() + 1;

  // `getFullYear()` devuelve el año completo
  //var year = today.getFullYear();

  // muestra la fecha de hoy en formato `MM/DD/YYYY`
  //console.log(`${month}/${day}/${year}`);

  /*
    Resultado: 1/27/2020
*/

  const [cotizacion, setCotizacion] = useState<cotizacionDTO[]>([]);

  //const [totalDePaginas, setTotalDePaginas] = useState(0);

  useEffect(() => {
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
  }, []);

  function buscarCotizacion(valores: filtroCotizacionForm) {
    console.log("Estos son los valores 1: ", valores);
    //  modificarURL(valores);
    axios
      .get(`${urlCotizacion}/filtrar`, { params: valores })
      .then((respuesta: AxiosResponse<cotizacionDTO[]>) => {
        const totalDeRegistros = parseInt(
          respuesta.headers["cantidadtotalregistros"],
          10
        );
        //setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
        setCotizacion(respuesta.data);
      });
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
  return (
    <>
      {/*<nav className="navbar navbar-expand-ancho navbar-light bg-light">
        <div className="container-fluid">
        <div className="collapse navbar-collapse" 
                    style={{display: 'flex', justifyContent: 'space-between' }}>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarCotizacion(valores);
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
                    <h5 style={{textAlign: 'center'}}>Acciones</h5>
                    {/*<Button
                      className="btn btn-danger mx-sm-2 mb-2"
                      onClick={() => {
                        formikProps.setValues(valorInicial);
                        buscarCotizacion(valorInicial);
                      }}
                    >
                      Borrar
                    </Button>*/}
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
                    <label onClick={handleClickOpen}  style={{color:'blue', textDecoration:'underline'}}>Vendedor:</label>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-tittle"
                    >
                      <DialogTitle id="form-dialog-tittle">
                        <div>Vendedor</div>
                      </DialogTitle>
                      <DialogContent>
                        <div className="container-fluid">
                          <form className="d-flex">
                            <input className="form-control me-2 light-table-filter" data-table="table"
                              type="text" placeholder="buscar vendedor" />
                              <hr></hr>
                          </form>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancelar
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          Agregar
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      style={{ width: "220px" }}
                      placeholder="Nombre del vendedor"
                      {...formikProps.getFieldProps("username")}
                    />
                  </div>
                  <div className="cliente">
                    <label onClick={handleClickOpen1}  style={{color:'blue', textDecoration:'underline'}}>Cliente:</label>
                    <Dialog
                      open={open1}
                      onClose={handleClose1}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
                      <DialogContent>
                      <div className="container-fluid">
                          <form className="d-flex">
                            <input className="form-control me-2 light-table-filter" data-table="table"
                              type="text" placeholder="buscar cliente" />
                              <hr></hr>
                          </form>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancelar
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          Agregar
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      style={{ width: "220px" }}
                      placeholder="Nombre del cliente"
                      {...formikProps.getFieldProps("nombre")}
                    />
                  </div>
                  <div className="tienda" style={{width: '220px'}}>
                    <div style={{width: '100px'}}>Tienda:</div>
                    <select className="form-control">
                      <option value="0">MATRIZ</option>
                      <option value="1">Muy baja</option>
                      <option value="2">Baja</option>
                      <option value="3">Normal</option>
                      <option value="4">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="row" >
                  <div className="borrar" style={{right: '10px'}}>
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
                      style={{width: '900px'}}
                    />
                  </div>
                  <div className="pre">Precio2:</div>
                  <div className="fecha" style={{width: '200px'}}>
                    Fecha:
                    {/*today.toString()*/}
                    {hoy.toDateString()}
                  </div>
                </div>

                <div className="roww">
                  <div className="probabilidadVenta" style={{width: '400px'}}>
                    <div style={{width: '220px'}}>Probabilidad Venta</div>
                    <select className="form-control">
                      <option value="0">Muy Baja</option>
                      <option value="1">Baja</option>
                      <option value="2">Normal</option>
                      <option value="3">Alta</option>
                    </select>
                  </div>
                  <div className="origen" style={{width: '300px'}}>
                    <div style={{width: '70px'}}>Origen</div>
                    <select className="form-control">
                      <option value="0">Mostrador</option>
                      <option value="1">Cliente</option>
                      <option value="2">Administrador</option>
                      <option value="3">Proveedor</option>
                    </select>
                  </div>
                  <div className="estatus">Estatus</div>
                </div>

                <div className="tabla" >
                  <div className="columna">Cantidad</div>
                  <div className="columna">Clave</div>
                  <div className="columna">Articulo</div>
                  <div className="columna">Precio</div>
                  <div className="columna">% Descuento</div>
                  <div className="columna">$ Descuento</div>
                  <div className="columna">Subtotal</div>
                </div>

                <div className="footer">
                  <div className="columnas">Cantidad:</div>
                  <div className="columnas">Articulo:</div>
                </div>
              </div>
                
                
                <div className="logo">
                    <img src={evolsoft} style={{ width: "350px", right: "350px", marginTop: '50px'}} />
                </div>
                <br />
                <br />
                <div className="subtotal" style={{ marginTop: '230px'}}>
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
                  style={{ backgroundColor: "greenyellow", marginTop: '330px'}}
                >
                  <Boton
                    onClick={() => {
                      formikProps.setValues(valorInicial);
                      buscarCotizacion(valorInicial);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlay} beat /> {"          "}
                    Generar (F12)
                  </Boton>
                </div>
                <div className="casilla" style={{ float: 'left', width: '20%', marginTop: '350px' }}>
                  <Field
                    className="form-check-input"
                    id="enviarCotizacion"
                    name="enviarCotizacion"
                    type="checkbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="enviarCotizacion"
                  >
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
}
