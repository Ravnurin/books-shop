import { Reducer } from 'redux';

import { Actions } from 'Constants/bookActions';
import { Book } from 'Types/Book';

export interface HomeAction {
  type: Actions;
  payload: Book[];
}

export interface HomeState {
  books: Book[];
}

const initialState = [] as Book[];

const homeReducer: Reducer<Book[], HomeAction> = (state = initialState, action) => {
    switch(action.type) {
      case Actions.GET_BOOKS:
        return action.payload;
      default:
        return state;
    }
};

export default homeReducer;