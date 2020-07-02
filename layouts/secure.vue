<template>
  <div>
    <div class="fixed top-0 bg-blue-300 w-screen">
      <div class="max-w-2xl flex p-4 mx-auto">
        <div class="w-1/5">
          {{ currentUser.username }}
        </div>
        <div class="w-4/5 flex justify-end">
          <nuxt-link class="mx-2" to="/me">
            Dashboard
          </nuxt-link>
          <a class="block mx-2 cursor-pointer" @click="logout">
            Logout
          </a>
        </div>
      </div>
    </div>
    <nuxt class="mt-16" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['currentUser']),
  beforeMount() {
    if (!this.currentUser.id) {
      this.$router.push('/')
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
      this.$store.dispatch('logout')
    }
  }
}
</script>
