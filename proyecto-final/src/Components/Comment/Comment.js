import React from 'react';

const Comment = ({ info }) => {
    const { description, user } = info;

    return (
        <div className="w-full border-t my-3">
            <h1 className="mt-2 text-black text-sm font-medium text-blue-400">
                @
                { user?.username }
            </h1>
            <p className="text-xs pl-4">{ description }</p>
        </div>
    );
};

export default Comment;