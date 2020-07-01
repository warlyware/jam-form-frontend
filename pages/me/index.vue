<template>
  <div class="container">
    <h1 class="text-5xl">hi {{ currentUser }}!</h1>
    <h2 class="text-2xl">My Forms</h2>
    <ul>
      <li v-for="form in published_form" :key="form.id">
        <span class="font-bold">
          {{form.headline}}
        </span> -
        <nuxt-link :to="{ path: `/form/${form.id}` }">
          Preview
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import forms from '~/apollo/queries/forms/fetch-by-user-id'

export default {
  data() {
    return {
      publishedForms: ''
    }
  },
  computed: mapState(['currentUser']),
  apollo: {
    published_form: {
      prefetch: true,
      query: forms,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex flex-col justify-center items-center text-center mx-auto;
}
</style>
