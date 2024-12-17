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
