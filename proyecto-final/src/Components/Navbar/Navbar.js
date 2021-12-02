import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";
//import { isDOMComponent } from "react-dom/test-utils";

//usaremos un navbar para el menu de navegacion
//de momento tenemos tres opciones

const Navbar = () => {
    //usasmos un estado para cambiar el icono del menu
    const [on, isOn] = useState(false);
    

    return (
        <nav className="w-screen flex flex-col items-end relative">
            <div className="w-full flex justify-between items-center">
                <h1 className="pl-4 text-white font-medium text-2xl">Bienvenido nombre</h1>
                {
                    on
                        ? <GrFormClose className="p-2 stroke text-white h-9 w-9 lg:h-15 lg:w-15" onClick={() => isOn(!on)} />
                        : <TiThMenu className="p-2 stroke text-black h-9 w-9 lg:h-15 lg:w-15 " onClick={() => isOn(!on)} />
                }
            </div>
            <ul className={`${on ? '' : 'hidden'} var text-white bg-black w-screen h-screen max-w-xs absloute nt-10 z-10`}>
                <li className="font-bold text-xl h-20 flex justify-center items-center hover:bg-white hover:text-black">Inicio</li>
                <li className="font-bold text-xl h-20 flex justify-center items-center hover:bg-white hover:text-black">Favoritos</li>
                <li className="font-bold text-xl h-20 flex justify-center items-center hover:bg-white hover:text-black">Mis Posts</li>

            </ul>
        </nav>
    );
}

export default Navbar;