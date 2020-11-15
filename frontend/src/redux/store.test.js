import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as articleActions from "./actions/articleActions";

it("Should handle creating courses", function() {
  // arrange
  // const store = createStore(rootReducer, initialState);
  // const course = {
  //   title: "Clean Code"
  // };

  // act
  // const action = articleActions.createArticleSuccess(course);
  // store.dispatch(action);

  // // assert
  // const createdArticle = store.getState().articles[0];
  // expect(createdArticle).toEqual(article);
});
