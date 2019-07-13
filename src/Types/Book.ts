interface Author {
  firstName: string;
  id: number;
  lastName: string;
}

export type Book = {
  author: Author;
  description: string;
  id: number;
  isBn: string;
  price: number;
  stockAmount: number;
  thumbnail: string;
  title: string;
};