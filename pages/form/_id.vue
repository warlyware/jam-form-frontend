<template>
  <div v-if="id && published_form">
    Form {{ published_form }}
  </div>
  <div v-else>
    Problem loading form
  </div>
</template>

<script>
import forms from '~/apollo/queries/forms/fetch-by-id.gql'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
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

<style lang="scss" scoped>

</style>
