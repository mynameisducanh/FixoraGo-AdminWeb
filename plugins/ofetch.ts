import { ofetch } from 'ofetch';
import { ACCESS_TOKEN, ERROR_CODE, LANGUAGE, REFRESH_TOKEN, USER } from '~/constants';

export default defineNuxtPlugin((_nuxtApp) => {
  const { $router } = useNuxtApp();
  const accessToken = useCookie<string | null>(ACCESS_TOKEN);
  const refreshToken = useCookie<string | null>(REFRESH_TOKEN);
  const language = useCookie<string | null>(LANGUAGE);
  const config = useRuntimeConfig();

  let isRefreshing = false;
  let refreshAndRetryQueue: Array<{
    req: RequestInfo;
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  const handleRefreshTokenExpired = (err?: Error) => {
    const routeCurrent = $router.currentRoute.value.path;
    if (!routeCurrent?.includes('login')) {
      $router.push(`/${language.value}/login`);
    }
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem(USER);
    return err && Promise.reject(err);
  };

  const instance = ofetch.create({
    baseURL: `${config.public.apiBase}/api`,
    headers: {
      Accept: 'application/json',
    },
    retry: 1,
    retryStatusCodes: [401],
    retryDelay: 500,

    onRequest({ options }: any) {
      options.headers = {
        ...options.headers,
        lang: language.value || 'vi',
      };
      // Check if accessToken exists and set it in headers
      if (accessToken.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken.value}`,
        };
      }
    },

    async onResponseError({ request, response, options, error }: any): Promise<any> {
      const { status } = response;
      if (status === ERROR_CODE.UNPROCESSABLE_ENTITY) {
        handleRefreshTokenExpired(error);
      }
      const originalRequest = request;
      if (status === ERROR_CODE.Unauthorized) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshResponse = await fetch(`${config.public.apiBase}/api/token/access-token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refreshToken: refreshToken.value }),
            });

            if (
              refreshResponse.status === ERROR_CODE.UNPROCESSABLE_ENTITY ||
              refreshResponse.status === ERROR_CODE.BAD_REQUEST
            ) {
              handleRefreshTokenExpired(error);
            }
            const data = await refreshResponse.json();
            accessToken.value = data.accessToken;
            options.headers = {
              Authorization: `Bearer ${accessToken.value}`,
            };

            if (request.toString().includes('/auth/logout')) {
              const body = {
                currentToken: data.accessToken,
              };
              options.body = body;
              const res = await instance(originalRequest, options);
              if (res) handleRefreshTokenExpired();
            }

            for (const { req, resolve, reject } of refreshAndRetryQueue) {
              try {
                const res = await instance(req);
                resolve(res);
              } catch (err) {
                reject(err);
              }
            }
            refreshAndRetryQueue = [];

            return await instance(originalRequest, options);
          } catch (e) {
            return Promise.reject(e);
          } finally {
            isRefreshing = false;
          }
        }
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({ req: originalRequest, resolve, reject });
        });
      }

      return Promise.reject(response);
    },
  });

  return {
    provide: {
      ofetch: instance,
    },
  };
});
