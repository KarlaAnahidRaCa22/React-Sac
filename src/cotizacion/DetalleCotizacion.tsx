import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Cargando from "../utils/Cargando";
import { coordenadaDTO } from "../utils/coordenadas.model";
import { urlCotizacion } from "../utils/endpoints";
import Mapa from "../utils/Mapa";
import { cotizacionDTO } from "./cotizacion.model";

export default function DetalleCotizacion(){
    /*const { id }: any = useParams();
    const [cotizacion, setCotizacion] = useState<cotizacionDTO>();

    useEffect(() => {
        axios.get(`${urlCotizacion}/${id}`)
        .then((respuesta: AxiosResponse<cotizacionDTO>) => {
            respuesta.data.fechaLanzamiento = new Date(respuesta.data.fechaLanzamiento);
            setCotizacion(respuesta.data);
        })
    }, [id])

    function transformarCoordenadas(): coordenadaDTO[]{
        if (cotizacion?.id){
            
        }

        return [];
    }

    function generarURLYoutubeEmbebido(url: any): string {
        if (!url){
            return '';
        }

        var video_id = url.split('v=')[1];
        var posicionAmpersand = video_id.indexOf('&');
        if (posicionAmpersand !== -1){
            video_id = video_id.substring(0, posicionAmpersand);
        }

        return `https://www.youtube.com/embed/${video_id}`
    }

    
*/
    return (
        <>
        <h1>Detalle Cotizacion</h1>
        {/*cotizacion ? 
        <div style={{ display: 'flex' }}>
            <div>
                    <Mapa soloLectura={true} coordenadas={transformarCoordenadas()} />
                </div>: null

            </div>
        :  <Cargando />*/}
        
        </>
    )
}