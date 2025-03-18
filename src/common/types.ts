export interface Product {
  category: string;
  name: string;
  image: string;
  price: number;
}

export interface ProductListProps {
  products: Product[];
}

export interface NavBarItem{
  category_id:number,
  category_name:string
}

export interface NavBarProps{
  navBarItems: NavBarItem[];
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
  onCreateProduct: (product: NewProduct) => void;
}

//For creating a new product
export interface NewProduct {
  product_name: string;
  category_id: number;
  price: number;
  description: string;
}

//For fetching products
export interface Product {
  id: number;
  product_name: string;
  category_id: number;
  category_name?: string; // Fetched via JOIN
  description: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface CheckoutFormData {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  zip: string;
}