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

// Product
export const PRODUCT_DETAIL_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/guest/product`;
