// Auth
export const AUTH_REGISTER_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register`;
export const AUTH_VERIFY_EMAIL_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/verify-email`;
export const AUTH_VERIFY_OTP_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/verify-otp`;
export const AUTH_LOGIN_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`;
export const AUTH_ME_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/me`;
export const AUTH_FORGOT_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/forgot-password`;
export const AUTH_RESET_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/reset-password`;

// Search
export const RECOMMEND_SEARCH_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/productList/searchRecommended`;
export const RECOMMEND_CATEGORY_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/categories`;
export const SEARCH_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/productList/search`;

// Product
export const PRODUCT_DETAIL_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/product`;
export const PRODUCT_ORDER_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/productList/getOrderProducts`;
export const PRODUCT_CATEGORIES_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/productList/getProductsByCategory`;

// Product List
export const PRODUCT_LIST_NEWEST_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/productList/getNewestProducts`;

// Categories
export const ALL_CATEGORIES_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/categories`;

// Order
export const ALL_ORDERS_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/orders`;
export const ORDER_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/orders`;
export const CANCEL_ORDER_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/orders/cancel`;
export const TRACK_ORDER_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/orders/track`;

// User
export const CHANGE_PROFILE_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/profile`;
export const CHANGE_PASSWORD_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/change-password`;

// Cart
export const CART_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/customer/cart`;
