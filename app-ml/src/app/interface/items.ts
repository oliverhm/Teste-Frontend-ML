export interface IPrice {
  currency: string;
  amount: number;
  decimals: number;
}

export interface IProduct {
  id: string;
  title: string;
  price: IPrice;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}

export interface IAuthor {
  name: string;
  lastname: string;
}

export interface IResponseProductDetails {
  author: IAuthor;
  item: IProduct;
}

export interface IResponseProductResults {
  author: IAuthor;
  categories: string[];
  items: IProduct[];
}
