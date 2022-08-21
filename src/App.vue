<script setup lang="ts">
import Categories from './components/Categories.vue';
</script>

<template>
  <div class="md:flex h-full w-full">
    <Categories />

    <main class="p-4 pt-14">
      <router-view />
    </main>
  </div>
</template>
