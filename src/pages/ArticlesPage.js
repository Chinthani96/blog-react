import React, { useState, useEffect } from 'react'
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";

const ArticlesPage = ({match}) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name)
    const otherArticles = articleContent.filter(article =>  article.name !==name)

    const [articleInfo, setArticleInfo] = useState({ upvotes:0, comments:[]});

    useEffect(() => {
            const fetchData = async () => {
                   const result = await fetch(`http://localhost:8000/api/articles/${name}`);
                   const body = await result.json();
                   console.log(body);
                   setArticleInfo(body);
            }
            fetchData();
        },[name]);

    if (!article) {
        return <NotFoundPage />
    }
    return (
        <React.Fragment>
            <h1>{article.title}</h1>
            <p>This post has been upvoted {articleInfo.upvotes} times</p>
            {article.content.map(((paragraph, key) => (

                <p key={key}>{paragraph}</p>
            )))}
            <h1>Related Articles: </h1>
            <ArticlesList articles={otherArticles} />
        </React.Fragment>
    );
}

export default ArticlesPage
