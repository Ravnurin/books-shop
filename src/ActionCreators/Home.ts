import axios from 'axios';

import { Actions } from 'Constants/Home';

export const getBooks = () => (dispatch: any) => {
  return axios
    .get('https://booksontap.azurewebsites.net/api/Books')
    .then(res => {
      dispatch({
        type: Actions.GET_BOOKS,
        payload: res.data.results
      });
    })
    .catch(err => {
      throw new Error(err);
    })
};