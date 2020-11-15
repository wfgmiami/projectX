import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function articleReducer(state = initialState.articles, action) {
  switch(action.type) {
    case types.ADD_ARTICLE:
      return [...state, { ...action.article }];
    case types.LOAD_ARTICLES_SUCCESS:
      return action.articles;
    default:
      return state;
  }
}


