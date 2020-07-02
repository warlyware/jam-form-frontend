<template>
  <div class="p-4 flex flex-col justify-center text-center mx-auto max-w-xl">
    <h1 class="text-xl mb-2">
      {{ form.headline }}
    </h1>
    <p class="mb-2">
      {{ form.tagline }}
    </p>
    <input v-model="email"
    class="p-2 border border-black mb-2"
    type="text">
    <button :style="buttonStyles"
    @click="addEmail">
      {{ form.buttonText }}
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
  computed: {
    ...mapState(['currentUser']),
    buttonStyles() {
      return `
        padding: 8px;
        background-color: ${this.form.buttonBackgroundColor};
        color: ${this.form.buttonTextColor};
        margin-top: 8px;
        height: 42px;`
    }
  },
  methods: {
    addEmail() {
      this.$apollo.mutate({
        mutation: addEmail,
        variables: {
          email: this.email,
          campaignId: this.form.campaignId,
          userId: this.form.userId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
