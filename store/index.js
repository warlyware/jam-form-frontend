// const initialState = {
//   currentUser: {
//     id: '4407908c-5a9a-4982-9bd9-9eefdcf10dd6',
//     username: 'dan'
//   },
//   authState: {}
// }

const initialState = {
  currentUser: {
    id: null,
    username: null
  }
}

export const state = () => initialState

export const mutations = {
  setAuthState(state, { status, user }) {
    if (user) {
      debugger
      state.status = status
      const { uid, email } = user
      state.currentUser = { id: uid, username: email }
    }
    // state.authState = authState
    // state.currentUser = authState.user
  }
}

export const actions = {
  ON_AUTH_STATE_CHANGED_ACTION({ commit }, { claims, authUser }) {
    console.log('onAuthStateChanged', { claims, authUser })
    // debugger
    const user = authUser
    if (user) {
      // const token = await user.getIdToken()
      // const idTokenResult = await user.getIdTokenResult()
      const hasuraClaim = claims['https://hasura.io/jwt/claims']

      if (hasuraClaim) {
        // debugger
        commit('setAuthState', { status: 'in', user })
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
  }
}
