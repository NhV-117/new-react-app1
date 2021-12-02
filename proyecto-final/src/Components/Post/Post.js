import shortid from 'shortid';
import axios from 'axios';
import React, { useState } from 'react';
import {BsHeartFill} from 'react-icons/bs';
import {FaCommentAlt} from 'react-icons/fa';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';

const Post = ({username, struct}) => {
    const {_id, title, description, image, user, createdAt, likes, comments} = struct;

    const [liked, setLiked] = useState(likes.includes({username}));
    const [likesCount, setLikesCount] = useState(likes.length); 
    const [showComments, setShowComments] = useState(false);
    const [commentState, setCommentState] = useState(comments);

    function addComment(comment) {
        const val = [...commentState, { ...comment, user: { username } }];

        setCommentState(val);
    }

    async function likePost() {
        try {
            const { data } = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!liked) {
                setLikesCount(likesCount + 1);
                setLiked(true);
            } else {
                setLikesCount(likesCount - 1);
                setLiked(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addFav(){
        try{
            const { data } = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div className="flex flex-col bg-red-400 bg-opacity-30 rounded-2xl w-full md:w-72 lg:w-96 p-4 text-black my-4">
            <div className="w-full flex space-around font-bold text-black">
                <h1 className="w-1/2">
                    @
                    {user?.username}
                </h1>
                <h2 className="text-right w-1/2">{ new Date(createdAt).toLocaleDateString() }</h2>
            </div>
            {
                image && <img className="w-full h-40 object-cover my-2 rounded-2xl" src={image} alt="imagen cualquiera" />
            }
            <div className="w-full flex flex-col font-medium text-sm space-y-2">
                <h1 className="">{ title }</h1>
                <h2 className="font-normal text-xs">{ description }</h2>
            </div>
            <div className="w-full mt-4 flex text-white justify-center">
                <button
                    onClick={likePost}
                    type="button"
                    className={`flex space-x-2 text-xs justify-center items-center w-1/2 ${liked && 'text-red-600'}`}
                >
                    <span><BsHeartFill className="mr-2 w-5 h-5 mx-0" /></span>
                    { likesCount }
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    type="button"
                    className={`flex space-x-2 text-xs justify-centAiOutlineHearter items-center w-1/2 ${showComments && 'text-blue-400'}`}
                >
                    <span><FaCommentAlt className="mr-2 text-black w-5 h-5 mx-0" /></span>
                    { commentState.length }
                </button>
            </div>
            <div className={`${!showComments && 'hidden'} mt-4 w-full flex flex-col items-start`}>
                {
                    comments && commentState.map((it) => (
                        <Comment
                            key={shortid.generate()}
                            info={it}
                        />
                    ))
                }
                <AddComment post={_id} afterSubmit={addComment} />
            </div>
        </div>
    );

};

export default Post;

//  <h1>hola panas bienvenidos</h1>
// <AiFillHeart className="text-red-500 " size="1.5em"/>