<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$fireAuth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken()
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims']

        if (hasuraClaim) {
          // debugger
          this.$store.commit('setAuthState', { status: 'in', user, token })
        } else {
          // Check if refresh is required.
          const metadataRef = this.$fireDb()
            .ref('metadata/' + user.uid + '/refreshTime')

          metadataRef.on('value', async data => {
            // if (!data.exists) { return }
            // Force refresh to pick up the latest custom claims changes.
            // const token = await user.getIdToken(true)
            // commit('setAuthState', { status: 'in', user, token })
          })
        }
      }
    })
  }
}
</script>
