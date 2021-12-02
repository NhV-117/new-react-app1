import React from "react";
import { AiFillCheckCircle } from 'react-icons/ai';
import axios from "axios";
import swal from "sweetalert";
const PostFrom = () => {
    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());
        console.log(body);


        if (body.title === '' || body.description === '') return alert('Asegurate de llenar el titulo y la descripcion');

    
        const res = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create',{ ...body, active: body.active === 'true' }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log(res);
    }

    return(
        <form className="lg:w-96 rounded-2xl bg-black mt-4 p-4 font-bold space-y-3 rounded-lg" onSubmit={onSubmit}>
        <div className="flex flex-col text-sm">
            <label className="text-white" htmlFor="title">Título</label>
            <input classsName="rounded-full text-gray-200 px-2 py-1 my-1 rounded-xl" type="text" name="title" id="title"></input>
        </div>
        <div className="flex flex-col text-sm">
            <label className="text-white" htmlFor="description">Descripción</label>
            <input classsName="text-gray-700 ropunded-full px-2 py-1 my-1" type="text" name="description" id="description"></input>
        </div>
        <div className="flex flex-col text-sm">
            <label className="text-white" htmlFor="image">Imagen</label>
            <input classsName="text-gray-700 ropunded-full px-2 py-1 my-1" type="text" name="image" id="image"></input>
        </div>
        <div className="flex flex-row text-sm items-center justify-center">
            <div className="flex text-sm w-1/3">
                <label className="text-white" htmlFor="active">Activo</label>
                <input className="rounded-xl mx-2"
                type="checkbox" name="active" id="active"></input>
            </div>
        
                <button type="submit" className="bg-blue-500 w-2/3 rounded-2xl text-center flex py-1 justify-center items-center font-bold">
                    <AiFillCheckCircle className="mr-2 h-5 w-5" />
                    Publicar
                </button>
        </div>
    </form>
    
    )
}

const showAlertEmptyParameters = () => {
    swal({
        title: "Parametros vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        button: "Aceptar",
        timer: 3000
    });
}

export default PostFrom;