<script setup lang="ts">
  const { loadTheme } = useTheme();

  onMounted(() => {
    loadTheme();
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>