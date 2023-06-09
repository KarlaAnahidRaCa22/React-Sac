import axios from "axios";
import Swal from "sweetalert2";
import Boton from "../utils/Boton";
import confirmar from "../utils/Confirmar";
import { urlCuentas } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { usuarioDTO } from "./auth.model";

export default function IndiceUsuario() {

    async function hacerAdmin(id:string){
        await editarAdmin(`${urlCuentas}/hacerAdmin`, id);
    }

    async function removerAdmin(id:string) {
        await editarAdmin(`${urlCuentas}/removerAdmin`, id);
    }
    
    async function editarAdmin(url: string, id: string) {
        await axios.post(url, JSON.stringify(id), 
            {
                headers: {'Content-Type': 'application/json'}
            }
        )

        Swal.fire({
            title: 'Exito',
            text: 'Operación realizada con éxito',
            icon: 'success'
        })
    }

    return (
        
        <IndiceEntidad<usuarioDTO> 
            url={`${urlCuentas}/listadoUsuario`}
            titulo="Usuario"
        >
            {usuario => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario?.map(usuario => <tr key={usuario.id}>
                        <td>
                            <Boton 
                                onClick={() => confirmar(() => hacerAdmin(usuario.id), 
                                        `¿Desea hacer a ${usuario.email} admin?`, 'Realizar')}>
                                    Hacer Admin</Boton>
                            <Boton className="btn btn-danger" style={{ marginLeft: '1rem' }} 
                                onClick={() => confirmar(() => removerAdmin(usuario.id), 
                                        `¿Desea remover a ${usuario.email} como admin?`, 'Realizar')}>
                                    Remover Admin</Boton>
                        </td>
                        <td>
                            {usuario.email}
                        </td>
                    </tr>)}
                </tbody>
            </>}
            
        </IndiceEntidad>
        
    )
}