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

export interface ProductModalProps {
  open: boolean;
  handleClose: () => void;
  onCreateProduct: (product: Product) => void;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
}