import React from "react";

import articles from "./article-content";

import Articles from "../components/Articles";

function ArticlesList() {
  return (
    <>
        <h1 className="sm:text-4xl text-2xl mb-6 font-bold text-gray-900">Articles</h1>
        <div className="container py-4 mx-auto">
            <div className="flex flex-wrap -m-4">
                <Articles articles={articles} />
            </div>
        </div>
    </>
  );
}

export default ArticlesList;