import Swal from 'sweetalert2';

export default function confirmar(onConfirm: any, 
    titulo: string = '¿Desea borrar el registro?', 
    textoBotonConfirmacion: string = "Borrar"
) {
        Swal.fire({
            title: titulo,
            icon: 'warning',
            confirmButtonText: textoBotonConfirmacion,
            showCancelButton: true,
            confirmButtonColor: '#BC2626',
            cancelButtonColor: '#384146',
            
        }).then(result => {
            if (result.isConfirmed){
                onConfirm();
            }
        })
}