<script setup lang="ts">
// Placeholder sidebar – will hold nav links (Data, API Explorer, Schema, etc.)
</script>

<template>
  <aside class="app-sidebar">
    <nav>
      <a href="/">Dashboard</a>
      <!-- Data browser, API explorer, Schema, Settings, etc. -->
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  min-width: 12rem;
  padding: 1rem;
  border-right: 1px solid var(--border-color, #eee);
}
</style>
