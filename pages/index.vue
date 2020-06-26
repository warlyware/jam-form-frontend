<template>
  <div class="container">
    <h1 class="text-2xl">Forms!</h1>
    <nuxt-link to="/me">Dashboard</nuxt-link>
    <div>
      <label for="username">
        Email
        <input type="text" name="username" v-model="email" class="border border-black p-2">
      </label>
      <br>
      <label for="password" class="block mt-2">
        Passord
        <input type="text" name="password" v-model="password" class="border border-black p-2">
      </label>
    </div>
    <button @click="createUser">
      Sign Up
    </button>
  </div>
</template>

<script>
import forms from '~/apollo/queries/forms/fetch-all.gql'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  apollo: {
    published_form: {
      prefetch: true,
      query: forms
    }
  },
  methods: {
    async createUser() {
      console.log(this)
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (e) {
        console.error(e)
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
