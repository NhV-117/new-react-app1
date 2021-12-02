import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import Post from "../Post/Post"
//const postURl = 'https://posts-pw2021.herokuapp.com/api/v1/post';
//const authURl = 'https://posts-pw2021.herokuapp.com/api/v1/auth';

const ContainerPost = ({ username}) => {
    const [post, setPosts] = useState({
        status: "loading",
        data: null,
    });
    
    useEffect(() => {
        async function getPosts() {
            const { data} = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=1', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            setPosts({ status: 'DONE', data: data.data });

            
        }
        getPosts();
    }
    , []);


    if (post.status === "loading") {
        return <Loading />
    }

    return (
        <div className="flex flex-col px-6 py-10 justify-center items-center">
            {
                post.data && post.data.map((it) => ( <Post username={username} struct={it} key={it._id}/> )) 
            }
        </div>
    )
}

export default ContainerPost;