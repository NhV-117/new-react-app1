import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import Loading from '../Loading/Loading';


const Owned = ({username}) => {

    const [post, setPosts] = useState({
        status: "loading",
        data: null,
    });

    useEffect(() => {
        async function getPosts() {
            const { data} = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=15&page=0', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            setPosts({ status: 'DONE', data: data.data });

            
        }
        getPosts();
    }, []);

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

export default Owned;