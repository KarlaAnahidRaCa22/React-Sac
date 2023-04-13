import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlCotizacion } from "../utils/endpoints";
import { convertirCotizacionAFormData } from "../utils/formDataUtils";
import { MostrarErrores } from "../utils/MostrarErrores";
import FormularioCotizacion from "./FormularioCotizacion";
import { cotizacionCreacionDTO, cotizacionDTO } from "./cotizacion.model";
import FiltroCotizacion from "./FiltroCotizacion";
import { FormikHelpers } from "formik";
import css from './CrearCotizacion.module.css';
import SplitPane from "react-split-pane";
import './Split.css'
import ContentWrapper from "../utils/ContentWrapper";

export default function CrearCotizacion(){
 
    let cotizacion:cotizacionDTO= {
        id: 0, nombre: ''
    }
    const [cargado, setCargado] = useState(false);
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    
    async function crear(cotizacion: cotizacionCreacionDTO) {
        try {
            const formData = convertirCotizacionAFormData(cotizacion);
            await axios({
                method: 'post',
                url: urlCotizacion,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/cotizacion/${respuesta.data}`);
            })
        }
        catch(error) {
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <ContentWrapper>
           <MostrarErrores errores={errores} />
           <FiltroCotizacion
                
           />
           
          </ContentWrapper>
           {/* <FormularioCotizacion modelo={cotizacion} 
            onSubmit={async valores => await crear(valores)}                
    /> */}
             
           
        </>  
    ) 
}

  /* return(
        <div className="CrearCotizacion">

            <div className="container">
                <p className="p">gdgdskgjkgsjbkdsjbgbdsbgjkdbgkbdkgbsdbjbajks
                    dbsgbdsbhgjbshdgjsdbgjbsjgbsjdbgjsdbgjbsdgbhjs
                    shbdgbshgbsjdbgjdsbgjbsdjgbsjbqwiejoijwoejrowj
                    djskdsnwkwnsfjknrnusdnkjnrkjnjksjanknrerniutnj
                </p>
            </div>
        </div>
    )
} */
            
