import { ref } from "vue";
import getProductsQuery from '../graphql/getProducts.query.gql'
import { useApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: 'https://venia.magento.com/graphql',
})
const cache = new InMemoryCache()
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
provideApolloClient(apolloClient)

const products = ref<any>([])
const { client } = useApolloClient()
const isLoading = ref<boolean>(false)
const pageSize = ref<number>(0)
const totalProducts = ref<number>(0)
const error = ref<string>('')

export default function useProductsStore() {
  async function getProducts({ uid, currentPage = 1 }: {uid: string, currentPage?: number}) {
    try {
      isLoading.value = true

      const { data = [] } = await client.query({
        query: getProductsQuery,
        variables: {
          uid,
          currentPage
        },
      })
      products.value = data.products.items
    
      pageSize.value = data.products.page_info.page_size
      totalProducts.value = data.products.total_count
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    error,
    isLoading,
    products,
    pageSize,
    totalProducts,
    getProducts,
  };
}
