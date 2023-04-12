import { CSSProperties } from "react";

export default function Boton(props: botonProps){
    return (
        <button type={props.type} className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.style}
        >{props.children}</button>
    )
}

interface botonProps{
    children: React.ReactNode,
    onClick?(): void;
    type: "button" | "submit"
    disabled: boolean;
    className: string;
    style: CSSProperties
}

Boton.defaultProps = {
    type: "button",
    disabled: false,
    className: 'btn btn-primary',
    style: null
}