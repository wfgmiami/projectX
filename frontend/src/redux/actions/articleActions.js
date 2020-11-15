import * as types from './actionTypes';
import * as articleApi from '../../api/articleApi'

export function addArticle(article) {
  return { type: types.ADD_ARTICLE, article };
}


export function loadArticleSuccess(articles) {
  return { type: types.LOAD_ARTICLES_SUCCESS, articles }
}

export function loadArticles() {
  return function (dispatch) {
    return articleApi
    .getArticles()
    .then(articles => {
      console.log('articles action', articles)
      dispatch(loadArticleSuccess(articles))
    })
    .catch(error => {
      throw error;
    })
  }
}
