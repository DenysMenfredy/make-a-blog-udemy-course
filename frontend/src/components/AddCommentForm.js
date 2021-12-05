import React, { useState } from "react";

import api from "../api";

export default function AddCommentForm({ articleName, setArticleInfo }) {
    
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");

    async function addComment(e) {
        e.preventDefault();
        const result = await api.post(`/api/articles/${articleName}/add-comments`, {
            username,
            text: comment,
        });
        console.log(result.data);
        setArticleInfo(result.data);
        setUsername("");
        setComment("");
    }

    return (
        <form className="shadow rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Add a Comment</h3>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input 
                type="text" 
                className="shadow appearance-none border rounded w-full 
                            py-2 px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>
            <label className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
            <textarea 
                rows="4" 
                cols="50" 
                className="shadow appearance-none border rounded w-full 
                           py-2 px-3 text-gray-700 leading-tight focus:outline-none
                           focus:shadow-outline"
                value={comment} 
                onChange={(e) => setComment(e.target.value)}/>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                           rounded focus:outline-none focus:shadow-outline"
                onClick={addComment}>
                Add Comment
            </button>

        </form>
    );
}