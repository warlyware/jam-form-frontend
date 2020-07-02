const initialState = {
  authStatus: 'out',
  currentUser: {
    id: null,
    username: null
  },
  token: null
}

export const state = () => initialState

export const mutations = {
  setAuthState(state, { status, user, token }) {
    if (user) {
      state.authStatus = status
      const { uid, email } = user
      state.currentUser = { id: uid, username: email }
      state.token = token
    }
  },
  resetAuthState(state) {
    state = { ...initialState }
  }
}

export const actions = {
  async logout({ commit }) {
    await this.$fireAuth.signOut()
    commit('resetAuthState')
  },
  async ON_AUTH_STATE_CHANGED_ACTION({ commit }, { claims, authUser }) {
    if (authUser) {
      // const token = await user.getIdToken()
      // const idTokenResult = await user.getIdTokenResult()
      const hasuraClaim = claims['https://hasura.io/jwt/claims']

      if (hasuraClaim) {
        const token = await authUser.getIdToken(true)
        console.log({ authUser, token })
        commit('setAuthState', { status: 'in', user: authUser, token })
      } else {
        // Check if refresh is required.
        const metadataRef = this.$fireDb
          .ref('metadata/' + authUser.uid + '/refreshTime')

        metadataRef.on('value', async data => {
          if (!data.exists) { return }
          // Force refresh to pick up the latest custom claims changes.
          const token = await authUser.getIdToken(true)
          commit('setAuthState', { status: 'in', user: authUser, token })
        })
      }
    }
  }
}
