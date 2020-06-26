const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const cors = require('cors')({ origin: true })

admin.initializeApp(functions.config().firebase)

const updateClaims = (uid) => admin.auth().setCustomUserClaims(uid, {
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': 'user',
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-user-id': uid
  }
})

exports.processSignUp = functions.auth.user()
  .onCreate(async user => {
    await updateClaims(user.uid)
    const metadataRef = admin.database().ref('metadata/' + user.uid)
    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh.
    return metadataRef.set({ refreshTime: new Date().getTime() })
  })
