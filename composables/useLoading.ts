export const useLoading = () => {
  const state = reactive<{ isLoading: boolean }>({ isLoading: false });

  return {
    $loading: {
      start: () => (state.isLoading = true),
      finish: () => (state.isLoading = false),
    },
    isLoading: computed(() => state.isLoading),
  };
};
