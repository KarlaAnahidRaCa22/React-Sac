import axios from "axios";
import Swal from "sweetalert2";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import { urlEmpresa } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { empresaDTO } from "./empresaUsuario.model";

export default function IndiceEmpresa() {

    async function hacerAdmin(id:number){
        await editarAdmin(`${urlEmpresa}/hacerAdmin`, id);
    }

    async function removerAdmin(id:number) {
        await editarAdmin(`${urlEmpresa}/removerAdmin`, id);
    }
    
    async function editarAdmin(url: string, id: number) {
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
        <IndiceEntidad<empresaDTO> 
            url={`${urlEmpresa}/listadoEmpresa`}
            titulo="Empresa"
        >
            {empresa => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {empresa?.map(empresa => <tr key={empresa.id}>
                        <td>
                            <Button 
                                onClick={() => confirmar(() => hacerAdmin(empresa.id), 
                                            `¿Desea hacer a ${empresa.username} admin?`, 'Realizar')}>
                                    Hacer Admin</Button>
                            <Button className="btn btn-danger" style={{ marginLeft: '1rem' }} 
                                onClick={() => confirmar(() => removerAdmin(empresa.id), 
                                            `¿Desea remover a ${empresa.username} como admin?`, 'Realizar')}>
                                    Remover Admin</Button>
                        </td>
                        <td>
                            {empresa.username}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndiceEntidad>
    )
}