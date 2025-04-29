import { defineStore } from 'pinia';
import { USER, ACCESS_TOKEN } from '~/constants';
import type { UserInterface } from '~/types/user';

export const useUserStore = defineStore('use-user', () => {
  const user = ref(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(USER) || '{}') : {}
  );
  const access_token = useCookie<string | null>(ACCESS_TOKEN);
  const currentUser = computed(() => user.value);
  const isAuthenticated = computed(() => (currentUser.value?.id && access_token.value ? true : false));
  const setUser = (userData: UserInterface) => {
    user.value = userData;
    localStorage.setItem(USER, JSON.stringify(userData));
  };

  return {
    currentUser,
    isAuthenticated,
    setUser,
  };
});
