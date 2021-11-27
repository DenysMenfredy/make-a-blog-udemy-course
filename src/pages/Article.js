import React from "react";
import { useParams } from "react-router-dom";
// useParams => hook to receive the params from the url
import articles from "./article-content";


function Article() {
    const { name } = useParams();
    const article = articles.find( (article) => article.name === name);

    if(!article) return <h1>Article not found</h1>;

    return (
        <>
            <h1 className="sm:text-4xl text-2xl mb-6 font-bold text-gray-900">
                {article.title}
            </h1>
            {article.content.map( (paragraph, index) => (
                <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
                    {paragraph}
                </p>
            ))}
        </>
        
    );
}

export default Article;