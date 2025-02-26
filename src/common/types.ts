export interface Product {
  category: string;
  name: string;
  image: string;
  price: number;
}

export interface ProductListProps {
  products: Product[];
}

export interface NavBarProps{
  navBarItems: string[];
}
