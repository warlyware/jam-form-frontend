<template>
  <div class="container">
    <h1>jam-form</h1>
    {{published_form}}
  </div>
</template>

<script>
import forms from '~/apollo/queries/fetch-forms.gql'

export default {
  apollo: {
    published_form: {
      prefetch: true,
      query: forms
    }
  },
  head: {
    title: 'Test Heading'
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex flex-col justify-center items-center text-center mx-auto;
}
</style>
