import { Reducer } from 'redux';

import { Actions } from 'Constants/bookActions';

export type BookDictionary = Record<string, DictionaryItem>;

export interface BasketAction {
  type: Actions;
  payload: DictionaryItem;
}

export interface DictionaryItem {
  id: number;
  title: string;
  price: number;
  count: number;
}


const initialState = {} as BookDictionary;

const basketReducer: Reducer<BookDictionary, BasketAction> = (state = initialState, action) => {
    switch(action.type) {
      case Actions.ADD_BOOK_TO_BASKET:
        return { ...state, [action.payload.id]: action.payload };
      default:
        return state;
    }
};

export default basketReducer;