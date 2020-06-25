<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">
      {{form.headline}}
    </h1>
    <p class="mb-2">
      {{form.text}}
    </p>
    <input v-model="email"
    class="p-2 border border-black"
    type="text">
    <br>
    <button class="bg-blue-600 p-2 rounded mt-4 text-white"
    @click="addEmail">
      {{ form.buttonText || 'Subscribe' }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import addEmail from '~/apollo/mutations/email-list/add-email'
export default {
  props: {
    form: {
      type: Object,
      requred: true,
      default: () => ({})
    }
  },
  data() {
    return {
      email: ''
    }
  },
  computed: mapState(['currentUser']),
  methods: {
    addEmail() {
      this.$apollo.mutate({
        mutation: addEmail,
        variables: {
          email: this.email,
          campaignId: this.form.campaignId,
          userId: this.currentUser.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
