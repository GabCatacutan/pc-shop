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

export interface CategoryModalProps {
  open: boolean;
  handleClose: () => void;
  onCreateCategory: (value: string) => void;
}

export interface Category {
  id: number,
  category_name: string,
  created_at: string | Date
}
