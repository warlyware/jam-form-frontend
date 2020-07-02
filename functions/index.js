global.fetch = require('node-fetch')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const gql = require('graphql-tag')
const print = require('graphql').print
const GraphQLClient = require('graphql-request').GraphQLClient

admin.initializeApp(functions.config().firebase)

const mutation = gql`
mutation ($id: String, $email: String, $username: String) {
  insert_user(objects: {id: $id, email: $email, username: $username}) {
    returning {
      id
      email
      username
    }
  }
}
`

const updateClaims = (uid) => admin.auth().setCustomUserClaims(uid, {
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': 'user',
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-user-id': uid
  }
})

const createUser = user => {
  const graphqlUrl = functions.config().hasura.api_url
  const adminPassword = functions.config().hasura.admin_secret
  const variables = {
    email: user.email,
    username: user.email,
    id: user.uid
  }
  const client = new GraphQLClient(graphqlUrl, {
    headers: {
      'content-type': 'application/json',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'User-Agent': 'Firebase Function',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'X-Hasura-Admin-Secret': adminPassword
    }
  })

  return client.request(print(mutation), variables)
}

exports.processSignUp = functions.auth.user()
  .onCreate(async user => {
    await updateClaims(user.uid)
    await createUser(user)
    const metadataRef = admin.database().ref('metadata/' + user.uid)
    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh.
    return metadataRef.set({ refreshTime: new Date().getTime() })
  })
