const initialState = {
  currentUser: {
    id: '4407908c-5a9a-4982-9bd9-9eefdcf10dd6',
    username: 'dan'
  },
  authState: {}
}

// const initialState = {
//   currentUser: {
//     id: null,
//     username: null
//   }
// }

export const state = () => initialState

export const mutations = {
  setAuthState(state, authState) {
    state.authState = authState
    state.currentUser = authState.user
  }
}

export const actions = {
  async ON_AUTH_STATE_CHANGED_ACTION({ commit }, { claims, authUser }) {
    // console.log('ON_AUTH_STATE_CHANGED_MUTATION', authUser)
    // if (authUser) {
    //   const token = await authUser.getIdToken()
    //   const idTokenResult = await authUser.getIdTokenResult()
    //   const hasuraClaim =
    //     idTokenResult.claims['https://hasura.io/jwt/claims']

    //   if (hasuraClaim) {
    //     debugger
    //     commit('setAuthState', { status: 'in', authUser, token })
    //   } else {
    //     // Check if refresh is required.
    //     const metadataRef = this.$fireDb()
    //       .ref('metadata/' + authUser.uid + '/refreshTime')

    //     metadataRef.on('value', async data => {
    //       // if (!data.exists) { return }
    //       // Force refresh to pick up the latest custom claims changes.
    //       // const token = await authUser.getIdToken(true)
    //       // commit('setAuthState', { status: 'in', authUser, token })
    //     })
    //   }
    // }
  }
}
