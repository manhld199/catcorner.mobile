export interface IAuthContext {
  userInfo: IUser | null;
  register: (user: IUser) => any;
  login: (user: IUser) => any;
  forgotPassword: (user: IUser) => any;
  resetPassword: (user: IUser) => any;
  logout: () => any;
  verifyEmail: (user: IUser) => any;
  verifyOtp: (user: IUser) => any;
}

export interface IUser {
  user_id?: string;
  user_name?: string;
  email?: string;
  user_role?: string;
  user_avt?: string;
  password?: string;
  reset_token?: string;
  new_password?: string;
  token?: string;
  otp?: string;
}

export interface IProductSuggest {
  highest_discount: number | null;
  lowest_price: number;
  product_id_hashed: string;
  product_img: string;
  product_name: string;
  product_slug: string;
  variant_names: string[];
  product_price: number;
}

export interface ICategory {
  category_id_hashed: string;
  category_img: string;
  category_name: string;
}

export interface IProductDetail {
  _id: string;
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_imgs: string[];
  product_avg_rating: {
    rating_point: number;
    rating_count: number;
  };
  product_sold_quantity: number;
  product_short_description: string;
  product_description: string;
  product_specifications: IProductSpecification[];
  product_variants: IProductVariant[];
  review_count: number[];
  recent_reviews: IReview[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductVariant {
  variant_name: string;
  variant_slug: string;
  variant_img: string;
  variant_price: number;
  variant_stock_quantity: number;
  variant_discount_percent: number;
  _id: string;
}

export interface IReview {
  id: number;
  user: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

export interface IProductSpecification {
  name: string;
  value: string;
}

export interface IPurchaseProduct {
  product_hashed_id: string;
  variant_id: string;
  quantity: number;
}

export interface IProductVariant {
  _id: string;
  variant_slug: string;
  variant_id: string;
  variant_name: string;
  variant_price: number;
  variant_stock_quantity: number;
  variant_img: string;
  variant_discount_percent: number;
}

export interface IProductSpecification {
  name: string;
  value: string;
}

export interface IRecentReview {
  user_id: string;
  user_name: string;
  user_avt: string;
  review_date: Date;
  variant_name: string;
  review_content: string;
  review_imgs: string[];
  review_vids: string[];
}

export interface IProductProps {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_imgs: string[];
  product_short_description: string;
  product_description: string;
  product_specifications: IProductSpecification[];
  category_id: string;
  product_variants?: IProductVariant[];
  product_rating: {
    rating_point: number;
    rating_count: number;
  };
  recent_reviews: IRecentReview[];
  lowest_price?: number;
  product_price: number;
  highest_discount?: number;
  product_sold_quantity?: number;
  category_name: string;
  variant_name: string[];
}

export interface ICartProduct {
  product_id: string;
  variant_id: string;
  quantity: number;
  product_name?: string;
  product_slug?: string;
  product_variants?: IProductVariant[];
}

export interface IProductOrder {
  _id: string;
  product_name: string;
  product_slug: string;
  product_variant: IProductVariant;
  quantity: number;
}

export interface IAddress {
  province: string;
  district: string;
  ward: string;
  street: string;
}
