import React from 'react';
import { connect } from 'react-redux';
import * as articleActions from '../../redux/actions/articleActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ArticleList from './ArticleList';


class ArticlesPage extends React.Component {

  componentDidMount() {

    const { articles, authors, actions } = this.props;

    if (articles.length === 0){
      actions.loadArticles().catch(error => {
        alert("Loading articles failed" + error);
      });
    }

    if (authors.length === 0){
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  render() {

    return(
      <>
        <h2>Scientific Articles</h2>
        <ArticleList articles={this.props.articles} />
      </>
    )
  }

}

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    articles:
      state.authors.length === 0
      ? []
      : state.articles.map(article => {
      return {
        ...article,
        authorName: state.authors.find(a => a.id == article.author_id).name
      }
    }),
    authors: state.authors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions:{
       loadArticles: bindActionCreators(articleActions.loadArticles, dispatch),
       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  }
}

// connect automatically passes dispatch if 2nd arg is omitted
export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
