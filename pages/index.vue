<template>
  <div class="container">
    <h1 class="text-2xl">
      Formium
    </h1>
    <h2 class="text-lg mb-2">
      Alpha
    </h2>
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

export default {
  data() {
    return {
      email: '',
      password: '',
      newUser: false
    }
  },
  computed: mapState(['currentUser', 'authStatus']),
  watch: {
    currentUser(newVal) {
      if (!this.newUser && this.authStatus === 'in' && this.currentUser.id) {
        this.$router.push('/me')
      }
    }
  },
  methods: {
    async createUser() {
      try {
        this.newUser = true
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        this.newUser = false
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
