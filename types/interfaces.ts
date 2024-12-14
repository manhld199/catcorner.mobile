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
