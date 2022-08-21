<script setup lang="ts">
import { computed, ref } from 'vue';
import CategoryItem from './CategoryItem.vue';
import { useQuery } from '@vue/apollo-composable';
import getCategories from '../graphql/getCategories.query.gql'
import Loader from './Loader.vue';

const isOpened = ref<boolean>(false)


const { result, loading }: { result: any, loading: any } = useQuery(getCategories)
const categories = computed(() => result?.value?.categories?.items || {})
</script>

<template>
  <aside
    class="categories absolute h-full md:relative w-80 z-10"
  >
    <Loader
      v-if="loading"
      message="Loading"
    />
    <button
      class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline absolute"
      @click="isOpened = !isOpened"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        class="w-6 h-6"
      >
        <path
          v-if="!isOpened"
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
        <path
          v-else
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      class="md:w-full text-gray-700 bg-white h-full ease-in-out duration-300 md:relative overflow-hidden"
      :class="{'w-full': isOpened, 'w-0': !isOpened }"
    >
      <div class="px-8 py-4 text-right md:text-left">
        <a
          href="#"
          class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
        >Cool name</a>
      </div>
      <nav
        class="md:block px-4 pb-4 md:pb-0 md:overflow-y-auto"
      >
        <div v-if="categories">
          <CategoryItem
            v-for="({ uid, name }) in categories"
            :key="uid"
            :name="name"
            :uid="uid"
          />
        </div>
        <div v-else>
          No data
        </div>
      </nav>
    </div>
  </aside>
</template>