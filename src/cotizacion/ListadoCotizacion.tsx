import { cotizacionDTO } from './cotizacion.model';
import CotizacionIndividual from './CotizacionIndividual';
import css from './ListadoCotizacion.module.css'
import Cargando from '../utils/Cargando';
import ListadoGenerico from '../utils/ListadoGenerico';

export default function ListadoCotizacion(props: listadoCotizacionProps){

    
        return (

        <ListadoGenerico listado={props.cotizacion}>
            <div className={css.div}>
                {props.cotizacion?.map(cotizacion => 
                <CotizacionIndividual cotizacion={cotizacion}
                                    key={cotizacion.id}
                />)}
            </div>
        </ListadoGenerico>
        )
    }
    


interface listadoCotizacionProps{
    cotizacion?: cotizacionDTO[]
}