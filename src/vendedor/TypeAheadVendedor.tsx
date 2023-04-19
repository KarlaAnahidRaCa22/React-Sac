import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { urlCotizacion } from "../utils/endpoints";
import { vendedorDTO } from "../cotizacion/cotizacion.model";

export default function TypeAheadVendedor(props: typeAheadVendedorProps){
    const [estaCargando, setEstaCargando] = useState(false);
    const [opciones, setOpciones] = useState<vendedorDTO[]>([]);

    const seleccion: vendedorDTO[] = []

    const [elementoArrastrado, setElementoArrastrado] = 
        useState<vendedorDTO | undefined>(undefined)

    function manejarBusqueda(query: string){
        setEstaCargando(true);

        axios.get(`${urlCotizacion}/listadoVendedor`)
            .then((respuesta: AxiosResponse<vendedorDTO[]>) => {
                setOpciones(respuesta.data);
                setEstaCargando(false);
            })
    }

    function manejarDragStart(vendedor: vendedorDTO)
    {
        setElementoArrastrado(vendedor);
    }

    function manejarDragOver(vendedor: vendedorDTO)
    {
        if (!elementoArrastrado){
            return;
        }

        if (vendedor.clave_usuario !== elementoArrastrado.clave_usuario){
            const elementoArrastradoIndice = 
                props.vendedor.findIndex(x => x.clave_usuario === elementoArrastrado.clave_usuario);
            const vendedorIndice = 
                props.vendedor.findIndex(x => x.clave_usuario)

            const vendedor = [...props.vendedor];
            vendedor[vendedorIndice] = elementoArrastrado;
            props.onAdd(vendedor);
        }
    }

    return (
        <>
            
            <AsyncTypeahead 
                id="typeahead"
                onChange={vendedor => {
                    if (props.vendedor.findIndex(x => x.clave_usuario === vendedor[0].clave_usuario) === -1){
                        props.onAdd([...props.vendedor, vendedor[0]]);
                    }
                    
                }}
                options={opciones}
                labelKey={vendedor => vendedor.nombre_usuario}
                filterBy={() => true}
                isLoading={estaCargando}
                onSearch={manejarBusqueda}
                placeholder="Escriba el nombre del vendedor..."
                minLength={2}
                flip={true}
                selected={seleccion}
            />

            <ul className="list-group">
                {props.vendedor.map(vendedor => <li 
                draggable={true}
                onDragStart={() => manejarDragStart(vendedor)}
                onDragOver={() => manejarDragOver(vendedor)}
                    className="list-group-item list-group-item-action"
                    key={vendedor.clave_usuario}>
                    {props.listadoUI(vendedor)}
                    <span className="badge badge-primary badge-pill pointer"
                    style={{marginLeft: '0.5rem'}}
                    onClick={() => props.onRemove(vendedor)}
                    >
                        X
                    </span>
                </li>)}
            </ul>
        </>
    )
}

interface typeAheadVendedorProps{
    vendedor: vendedorDTO[];
    onAdd(vendedor: vendedorDTO[]): void;
    listadoUI(vendedor: vendedorDTO): ReactElement;
    onRemove(vendedor: vendedorDTO): void;
}