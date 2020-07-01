<template>
  <div>
    <div class="fixed top-0 bg-blue-300 h-64">
      asdf
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['currentUser']),
  beforeMount() {
    console.log('beforeMount')
    if (!this.currentUser.id) {
      this.$router.route('/')
    }
  }
}
</script>
