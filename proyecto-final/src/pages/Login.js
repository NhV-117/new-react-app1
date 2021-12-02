import React, { useRef, useState } from 'react';
import { FaTruckMonster, FaUserCircle } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
// url de la API https://posts-pw2021.herokuapp.com/
//creamos la Url bases para utilizar en el proyecto
//repo https://github.com/TestClasss/evaluacion8proyectofinal-grupo50.git
const postURl = 'https://posts-pw2021.herokuapp.com/api/v1/post';
const authURl = 'https://posts-pw2021.herokuapp.com/api/v1/auth';



//Creamos el componente login 
const Login = () => {
    const navigate = useNavigate();
    //creamos una referencia para el input de usuario
    const username = useRef(null);
    const password = useRef(null);

    //usamos un estado para el icono de vista de contraseña
    const [on, isOn] = useState(true);


    let text = '';

    async function onSubmit(e) {
        e.preventDefault();



        const usernameValue = username.current.value;
        const passwordValue = password.current.value;

        //caso que no se llenen los campos se muestra una alerta
        if (usernameValue === '' || passwordValue === '') {
            showAlertEmptyParameters();
        }


        //hacemos la peticion de login usando axios
        try {
            const response = await axios.post(`${authURl}/signin`,
                {
                    //mandamos el usuario y contraseña
                    username: usernameValue,
                    password: passwordValue
                });
            //mandamos el token retornda por la api al localstorage
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                navigate('/');
            }
        } catch (error) {
            ShowAlertError(error.response);
        }
    }

    return (
        <form className="text-black flex flex-col justify-center mx-auto items-center w-80 h-screen max-w-screen-sm md:w-auto"
            onSubmit={onSubmit}>
            <div className="flex flex-col space-y-1 my-2">
                <label htmlFor="l-username" className="text-lg font-medium font-mono inline-flex">
                    <FaUserCircle className="mr-1" /> Username
                </label>
                <input className="border-2 rounded-lg" id="l-username" placeholder="Username" type="text" ref={username} />
            </div>

            <div className="flex flex-col space-y-1 justify-center ml-4">

                <label htmlFor="l-password" className="text-lg font-medium font-mono inline-flex" >
                    <FaKey className="mr-1" /> Password
                </label>

                <div className="inline-flex justify-center items-center">
                    <input className="border-2 rounded-lg" id="l-password" placeholder="Password" type={text} ref={password} />
                    {
                        on ? <AiFillEyeInvisible className="w-5 h-5 ml-2" onClick={() => {
                            var z = document.getElementById("l-password");
                            isOn(!on)
                            z.type = 'text'
                        }} /> :
                            <AiFillEye className="w-5 h-5" onClick={() => {
                                var z = document.getElementById("l-password");
                                isOn(!on)
                                z.type = 'password'
                            }} />
                    }
                </div>

            </div>

            <button className="w-full bg-black text-white rounded-2xl py-2 my-3" type="submit">Login</button>
        </form>
    );
}

//funcion para mostrar alerta
const showAlertEmptyParameters = () => {
    swal({
        title: "Parametros vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        button: "Aceptar",
        timer: 3000
    });
}

//creamos la funcion para mostrar alerta de error
const ShowAlertError = (response) => {
    let message = '';
    let title = '';

    if (response.status === 401) {
        message = 'Usuario o contraseña incorrectos';
        title = 'Error 401';
    }
    else if (response.status === 500) {
        message = 'Error del servidor';
        title = 'Error 500';
    }
    else if (response.status === 404) {
        title = 'Error 404';
        message = 'Usuario no encontrado';
    }
    swal({
        title: title,
        text: message,
        icon: "error",
        button: "Aceptar",
        timer: 3000
    });
}

export default Login;