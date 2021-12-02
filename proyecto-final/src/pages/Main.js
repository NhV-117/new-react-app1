import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import Navbar from "../Components/Navbar/Navbar.js";
//import Post from "../Components/Post/Post.js";
import ContainerPost from "../Components/Container/ContainerPost.js";
import { AiFillPlusCircle } from 'react-icons/ai';
import PostFrom from "../Components/PostFrom/PostFrom.js";

const Main = () => {
    const [whoami, setWhoami] = useState();
    const [isVisibleForm, setIsvisibleForm] = useState(false);
    const navigate = useNavigate(); 
    const user = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    //si el usuario no esta logueado lo redireccionamos a la pagina de login
    useEffect(() => {
        async function getIdentity(){
            const {data} = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/auth/whoami"`, {
                headers: {
                    Autorization: `Bearer ${user}`,
                },
            });
            setWhoami(data.username);
        }
        if(user === null){
            navigate('/login');

        getIdentity();
        } 
    },[]);

    return(
        <div>
        {
            role === 'admin'
            && (
                <div className="px-6">
                    <button
                        onClick={() => setIsvisibleForm(!isVisibleForm)}
                        type="button"
                        className="w-full md:w-72 lg:w-80 flex justify-center mt-3 p-4 bg-white bg-opacity-30 rounded-2xl"
                    >
                        <AiFillPlusCircle className="stroke text-white h-6 w-6" />
                    </button>
                    { isVisibleForm && <PostFrom /> }
                </div>
            )
        }
        <ContainerPost username={whoami} />
    </div>
    );
  
};

export default Main;