import Api from './api';
import type { RegisterInterface, SignInInterface, ForgotPasswordInterface } from '~/types/auth';

class AuthApi extends Api {
  constructor() {
    super('auth');
  }

  login(resource: SignInInterface) {
    return this.request('post', '/login', resource);
  }

  register(resource: RegisterInterface) {
    return this.request('post', '/register', resource);
  }

  sendVerifyEmail(resource: { email: string | undefined }) {
    return this.request('post', '/send-verify-email', resource);
  }

  verifyEmail(resource: { token: string | undefined }) {
    return this.request('post', '/verify-email', resource);
  }

  sendForgotPassword(resource: ForgotPasswordInterface) {
    return this.request('post', '/send-forgot-password', resource);
  }
  resetPassword(resource: {password:string , token: string} ) {
    return this.request('post', '/reset-password', resource);
  }

  changePassword(resource: { currentPassword: string; newPassword: string }) {
    return this.request('post', '/change-password', resource);
  }

  logout() {
    return this.request('post', '/logout');
  }
}

export default AuthApi;
