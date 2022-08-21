<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Object,
  }
});
</script>

<template>
  <div class="group relative">
    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80">
      <img
        src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
        alt=""
        class="w-full h-full object-center object-cover lg:w-full lg:h-full"
      >
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ props.name }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Black
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">
        {{ props.price.value }} {{ props.price.currency }}
      </p>
    </div>
  </div>
</template>