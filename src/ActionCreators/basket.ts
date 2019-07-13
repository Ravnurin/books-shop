import { Actions } from 'Constants/bookActions';
import { DictionaryItem } from 'Reducers/basketReducer';

export const addBookToBasket = (book: DictionaryItem) => (dispatch: any) => {
  return dispatch({
    type: Actions.ADD_BOOK_TO_BASKET,
    payload: book
  });
};
