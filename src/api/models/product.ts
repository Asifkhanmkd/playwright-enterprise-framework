export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  image?: string[];
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
}

export interface UpdateProductRequest {
  tile?: string;
  description?: string;
  price?: number;
}
