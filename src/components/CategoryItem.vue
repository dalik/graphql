<script setup lang="ts">
import useProductsStore  from '../store/ProductsStore';

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  uid: {
    required: true,
    type: String,
  }
});

const { getProducts } = useProductsStore()

</script>

<template>
  <router-link
    class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    :to="`/category/${uid}`"
    active-class="bg-gray-200"
    @click="getProducts({ uid: props.uid })"
  >
    {{ props.name }}
  </router-link>
</template>