import React from 'react';
import { Location } from 'history';
import { Book } from 'Types/Book';

interface Props {
  location: Location;
}

export default function BookDetails(props: Props) {
  const book: Book = props.location.state;
  
  return (
    <>
    {book.stockAmount}
    </>
  );
}