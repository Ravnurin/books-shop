interface Author {
  firstName: string;
  id: string;
  lastName: string;
}

export type Book = {
  author: Author;
  description: string;
  id: string;
  isBn: string;
  price: number;
  stockAmount: number;
  thumbnail: string;
  title: string;
};