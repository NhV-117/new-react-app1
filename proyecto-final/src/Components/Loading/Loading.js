import React from "react";
import {IoMdRefreshCircle} from "react-icons/io";

const Loading = () => (
    <div className="flex flex-col justify-center items-center absolute top-0 left-0 z-20 bg-white h-screen w-screen">
        <IoMdRefreshCircle className="text-black animate-spin" size={50}/>
        <h1 className="font-bold text-3xl">Loading....</h1>
    </div>
)

export default Loading;