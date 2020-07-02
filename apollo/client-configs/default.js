import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API = process.env.HASURA_URL

export default (context) => ({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
  getAuth() { return context.store.state.token ? `Bearer ${context.store.state.token}` : '' }
})
