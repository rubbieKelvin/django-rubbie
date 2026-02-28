<script setup lang="ts">
import AppSidebar from './components/layout/AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.app-main {
  flex: 1;
  overflow: auto;
}
</style>
