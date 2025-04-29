import AuthApi from '~/api/authApi';
import { useLoading } from '@/composables/useLoading';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER, USER_ROLE, LANGUAGE } from '@/constants';
import type { SignInInterface } from '~/types/auth';
import type { UserInterface } from '~/types/user';

export const useAuth = () => {
  const { $loading, isLoading } = useLoading();
  const { $router } = useNuxtApp();
  const userStore = useUserStore();
  const authApi = new AuthApi();
  const language = useCookie<string | null>(LANGUAGE);

  const access_token = useCookie(ACCESS_TOKEN, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 1 * 1000),
  });
  const refresh_token = useCookie(REFRESH_TOKEN, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
  });

  const signIn = async (body: SignInInterface, redirectUrl: string | null | undefined) => {
    try {
      const res = await authApi.login(body);
      console.log('signIn', res);
      if (res) {
        const { refreshToken, accessToken } = res;
        access_token.value = accessToken;
        refresh_token.value = refreshToken;
        await fetchUser(accessToken, redirectUrl);
        return Promise.resolve(res);
      }
    } catch (err) {
      return Promise.reject(err);
    } finally {
      $loading.finish();
    }
  };

  const fetchUser = async (token: string, redirectUrl: string | null | undefined) => {
    try {
      const config = useRuntimeConfig();

      const result = await fetch(`${config.public.apiBase}/api/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await result.json();
      console.log('fetchUser', response, result);
      if (response) {
        const user = response;
        localStorage.setItem(USER, JSON.stringify(user));
        userStore.setUser(user);
        handleRedirectUser(user, redirectUrl);
      }
    } catch (err) {
      return Promise.reject(err);
    } finally {
      $loading.finish();
    }
  };

  const logout = async () => {
    try {
      const res = await authApi.logout();

      if (res) {
        access_token.value = null;
        refresh_token.value = null;
        localStorage.removeItem(USER);
        location.replace('/');
        return res;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const handleRedirectUser = (user: UserInterface, redirectUrl?: string | null | undefined) => {
    if (redirectUrl) {
      const { currentUser } = useUserStore();
      window.location.href = `${redirectUrl}?folder=${currentUser.userFolderId}&ac=${access_token.value}&rf=${refresh_token.value}`;
    } else {
      switch (user.roles) {
        case USER_ROLE.Admin:
          $router.push(`/dashboard`);
          console.log("admin")
          break;
        case USER_ROLE.User:
          console.log("user")
          // $router.push(`/${language.value}/user`);
          break;
        default:
          break;
      }
    }
  };

  return {
    signIn,
    isLoading,
    logout,
    handleRedirectUser,
    fetchUser,
  };
};
