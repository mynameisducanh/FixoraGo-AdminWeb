<script setup lang="ts">
definePageMeta({
  layout: 'blank',
});

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    admin fixorago

    <Button @click="router.push('/login')">Đăng nhập</Button>
    </div>
</template>
