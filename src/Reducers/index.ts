import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux'

import { Book } from 'Types/Book';
import booksReducer from './homeReducer';
import basketReducer, { BookDictionary } from './basketReducer';


export interface ApplicationState {
  router: any;
  books: Book[];
  basket: BookDictionary;
}

export default (history: History<any>) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  books: booksReducer,
  basket: basketReducer
});
