<template>
  <div class="container">
    <h1 class="text-2xl">
      Formium Alpha
    </h1>
    <div>
      <label for="username">
        Email
        <input v-model="email"
        type="text"
        name="username"
        class="border border-black p-2">
      </label>
      <br>
      <label for="password" class="block mt-2">
        Passord
        <input v-model="password"
        type="password"
        name="password"
        class="border border-black p-2">
      </label>
    </div>
    <div class="row">
      <button class="p-2 border border-black m-2 rounded-lg shadow-lg hover:shadow-2xl" @click="createUser">
        Sign Up
      </button>
      <button class="p-2 border border-black m-2 rounded-lg shadow-lg hover:shadow-2xl" @click="login">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  computed: mapState(['currentUser', 'authStatus']),
  methods: {
    async createUser() {
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        console.log(this.authStatus, this.currentUser)
        debugger
        if (this.authStatus === 'in' && this.currentUser.id) {
          this.$router.push('/me')
        }
      } catch (e) {
        console.error(e)
      }
    },
    async login() {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        console.log(this.authStatus, this.currentUser)
        debugger
        if (this.authStatus === 'in' && this.currentUser.id) {
          this.$router.push('/me')
        }
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
