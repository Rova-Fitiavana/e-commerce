export interface ProductParam {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isReadOnly?: boolean
}
