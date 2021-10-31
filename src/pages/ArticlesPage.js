import React, { useState, useEffect } from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";

const ArticlesPage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  const [apiData, setApiData] = useState([]);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8000/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  useEffect(()=>{
    setApiData([
        {
          "widgetId": "$datatype.uuid",
          "parentWidgetId": null,
          "widgetTypeId": "$datatype.number",
          "widgetTypeName": "external",
          "name": "$commerce.department",
          "description": null,
          "data": "http://localhost:8000/",
          "filterTypes": [],
          "rawData": null
        },
        {
          "widgetId": "$datatype.uuid",
          "parentWidgetId": null,
          "widgetTypeId": "$datatype.number",
          "widgetTypeName": "jsx",
          "name": "$commerce.department",
          "description": null,
          "data": "<View style={{flex: 1,backgroundColor: \"#D6EAF8\",justifyContent: \"center\",alignItems: \"center\",}}><Text>Custom JSX View</Text></View>",
          "filterTypes": [],
          "rawData": null
        }
      ])
  },[])

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <React.Fragment>
      <h1>{article.title}</h1>
      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h1>Related Articles: </h1>
      <ArticlesList articles={otherArticles} />
    </React.Fragment>
  );
};

export default ArticlesPage;
