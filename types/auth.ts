export interface SignInInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordInterface{
  email: string;
}

export interface ResetPasswordInterface {
  password: string;
  confirmPassword: string;
}
export interface shareFileInterface{
  email: string;
  id:number | undefined;
}
export interface UpdatePasswordInterface {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}