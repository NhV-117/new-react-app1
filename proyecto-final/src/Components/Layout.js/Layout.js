import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";

//el outlet sirve para que el router pueda renderizar el componente que le corresponda


const Layout = () => (
    <>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </>
)
export default Layout;