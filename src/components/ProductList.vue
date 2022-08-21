<script setup lang="ts">
import useProductsStore from '../store/ProductsStore';
import ProductItem from './ProductItem.vue';
import Loader from './Loader.vue';
import { ref, watch } from 'vue';
import Pagination from 'v-pagination-3';

const { products, isLoading, pageSize, totalProducts, getProducts, error } = useProductsStore()
const currentPage = ref<number>(1)

const props = defineProps({
  categoryId: {
    required: true,
    type: String,
  }
});

const handlePaginate = () => {
  getProducts({ uid: props.categoryId, currentPage: currentPage.value })
  document?.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })
};

watch(
  () => props.categoryId,
  () => {
    getProducts({ uid: props.categoryId })
  },
   {immediate: true }
)
</script>

<template>
  <div v-if="!error">
    <Loader
      v-if="isLoading"
      fixed
      message="Loading"
    />
    <div class="md:pt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 w-full pb-10">
      <ProductItem
        v-for="(item) in products"
        :key="item.sku"
        :name="item.name"
        :price="item.price_range.minimum_price.regular_price"
      />
    </div>

    <pagination
      v-model="currentPage"
      :records="totalProducts"
      :per-page="pageSize"
      @paginate="handlePaginate"
    />
  </div>
  <div>{{ error }}</div>
</template>

<style lang="scss">
.VuePagination__pagination {
  display: flex;
  gap: 5px
}

.VuePagination__pagination-item.active button {
  border-color: #646cff;
}
</style>