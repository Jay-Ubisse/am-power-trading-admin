interface ProductsProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  category: string;
  subCategory: string;
  quantityInStock: number;
  quantitySold: number;
}

interface filtersDataProps {
  filter: string;
  value?: string;
}
