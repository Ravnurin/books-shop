import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux'

import { Book } from 'Types/Book';
import booksReducer from './homeReducer';


export interface ApplicationState {
  router: any;
  books: Book[];
}

export default (history: History<any>) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  books: booksReducer
});
