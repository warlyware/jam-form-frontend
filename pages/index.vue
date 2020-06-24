<template>
  <div class="container">
    <h1 class="text-2xl">Forms!</h1>
    <nuxt-link to="/me">Dashboard</nuxt-link>
  </div>
</template>

<script>
import forms from '~/apollo/queries/forms/fetch-all.gql'

export default {
  apollo: {
    published_form: {
      prefetch: true,
      query: forms
    }
  },
  head: {
    title: 'Forms!'
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex flex-col justify-center items-center text-center mx-auto;
}
</style>
