<template>
  <published-form v-if="id && published_form[0]" :form="published_form[0]" />
  <div v-else>
    Problem loading form
  </div>
</template>

<script>
import forms from '~/apollo/queries/forms/fetch-by-id.gql'
import PublishedForm from '~/components/PublishedForm.vue'

export default {
  components: {
    PublishedForm
  },
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
