import { Reducer } from 'redux';

import { Actions } from 'Constants/Home';
import { Book } from 'Types/Book';

export interface HomeAction {
  type: Actions;
  payload: Book[];
}

export interface HomeState {
  books: Book[];
}

const initialState = [] as Book[];

const booksReducer: Reducer<Book[], HomeAction> = (state = initialState, action) => {
    switch(action.type) {
      case Actions.GET_BOOKS:
        return action.payload;
      default:
        return state;
    }
};

export default booksReducer;