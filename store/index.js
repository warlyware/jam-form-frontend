const initialState = {
  currentUser: {
    id: '4407908c-5a9a-4982-9bd9-9eefdcf10dd6',
    username: 'dan'
  }
}

// const initialState = {
//   currentUser: {
//     id: null,
//     username: null
//   }
// }

export const state = () => initialState

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
  }
}
