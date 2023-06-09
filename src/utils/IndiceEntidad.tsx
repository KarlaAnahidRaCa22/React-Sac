import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Boton from "./Boton";
import confirmar from "./Confirmar";
import ListadoGenerico from "./ListadoGenerico";
import Paginacion from "./Paginacion";

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>){
    
    const [entidades, setEntidades] = useState<T[]>();
    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [recordsPorPagina, setRecordsPorPagina] = useState(10);
    const [pagina, setPagina] = useState(1);
    
    useEffect(() => {
        // Update the document title using the browser API
        cargarDatos()
      }, [pagina, recordsPorPagina]);

    function cargarDatos(){
        axios.get(props.url, {
            params: { pagina, recordsPorPagina }
        })
            .then((respuesta: AxiosResponse<T[]>) => {
                const totalDeRegistros = 
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
                setEntidades(respuesta.data);
        })
    }

    async function borrar(id: number){
        try{
            await axios.delete(`${props.url}/${id}`)
            cargarDatos();
        }
        catch(error){
            console.log(error.response.data);
        }
    }

    

    const botones = (urlEditar: string, id: number) => <>
        <Link className="btn btn-success" to={urlEditar}>Editar</Link>
        <Boton 
            onClick={() => confirmar(() => borrar(id))}
            className="btn btn-danger">Borrar</Boton>
    </>

    return (
        <>
            <h3>{props.titulo}</h3>
            {props.urlCrear ?  <Link className="btn btn-primary" to={props.urlCrear}>
                Crear {props.nombreEntidad}
            </Link> : null }

            <div className="form-group" style={{width: '150px'}}>
                <label>Registros por página:</label>
                <select
                    className="form-control" 
                    defaultValue={10}
                    onChange={e => {
                        setPagina(1);
                        setRecordsPorPagina(parseInt(e.currentTarget.value, 10)
                    )}}>    
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            
            <Paginacion cantidadTotalDePaginas={totalDePaginas}
                paginaActual={pagina}
                onChage={nuevaPagina => setPagina(nuevaPagina)} />

            <ListadoGenerico listado={entidades}>
                <table className="table table-striped">
                    {props.children(entidades!, botones)}
                </table>
            </ListadoGenerico>

        </>
    )
}

interface indiceEntidadProps<T>{
    url: string;
    urlCrear?: string;
    children(entidades: T[], 
        botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
    titulo: string;
    nombreEntidad?: string;
}