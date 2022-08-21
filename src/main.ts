import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { router } from './router'

const httpLink = createHttpLink({
  uri: 'https://venia.magento.com/graphql',
})
const cache = new InMemoryCache()
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})


createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .mount('#app')
