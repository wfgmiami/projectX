import React from "react";
import PropTypes from "prop-types";

const ArticleList = ({ articles }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {articles.map(article => {
        return (
          <tr key={article.id}>
            <td>
              <a href={article.slug}>
                {article.title}
              </a>
            </td>

            <td>{article.authorName}</td>
            <td>{article.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
