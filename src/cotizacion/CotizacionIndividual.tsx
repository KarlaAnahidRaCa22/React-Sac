import { cotizacionDTO } from "./cotizacion.model";
import css from './CotizacionIndividual.module.css'
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import axios from "axios";
import { urlCotizacion } from "../utils/endpoints";
import { useContext } from "react";
import AlertaContext from "../utils/AlertaContext";
import Autorizado from "../auth/Autorizado";
import { Link } from "react-router-dom";

export default function CotizacionIndividual(props: CotizacionIndividualProps){
    const construirLink = () => `/cotizacion/${props.cotizacion.id}`
    //http://localhost:3000/ http://localhost:3000/cotizacion/3

    const alerta = useContext(AlertaContext)

    function borrarCotizacion(){
        axios.delete(`${urlCotizacion}/${props.cotizacion.id}`)
            .then(() => {
                alerta();
            })
    }
    function MostrarLink() {
        console.log("CL")
        console.log(construirLink())
    }

    return (
        <div className={css.div}>
            <Link to={construirLink()} onClick={() => MostrarLink()}>
                <img src={props.cotizacion.poster} alt="Poster" />
            </Link>
            <p>
                <Link to={construirLink()}>{props.cotizacion.nombre}</Link>
            </p>
            <Autorizado role="admin"
                autorizado={
                    <div>
                        <Link style={{marginRight: '1rem'}} className="btn btn-info"
                            to={`/cotizacion/editar/${props.cotizacion.id}`}>Editar</Link>
                        <Button
                            onClick={() => confirmar(() => borrarCotizacion())}
                            className="btn btn-danger">Borrar</Button>
                    </div>
                }
            />
            
        </div>
    )
}

interface CotizacionIndividualProps{
    cotizacion: cotizacionDTO;
}