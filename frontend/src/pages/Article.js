import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// useParams => hook to receive the params from the url
import articles from "./article-content";
import api from '../api';
import Articles from "../components/Articles";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import NotFound from "./NotFound";

function Article() {


    const { name } = useParams();
    const article = articles.find( (article) => article.name === name);
    const [articleInfo, setArticleInfo] = useState({ comments: [] });

    useEffect(() => {
        console.log('component mounted');
        const fetchData = async () => {
            const result = await api.get(`/api/articles/${name}`);
            console.log(result.status);
            console.log(result.data);
            // console.log(body);
            setArticleInfo(result.data);
        };
        fetchData();
    }, [name]);

    if(!article) return <NotFound />;
    const otherArticles = articles.filter( (article) => article.name !== name);

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
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
            <h1 className="sm:text-2x text-xl font-bold mt-4 mb-4 text-gray-900">
                Other Articles
            </h1>
            <div className="flex flex-wrap -m-4">
                <Articles articles={otherArticles} />
            </div>
        </>
        
    );
}

export default Article;