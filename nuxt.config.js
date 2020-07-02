
module.exports = {
  telemetry: false,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.15.4/firebase-analytics.js' }
    ]
  },
  env: {
    HASURA_URL: process.env.HASURA_URL
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/firebase'
  ],
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'jam-form.firebaseapp.com',
      databaseURL: 'https://jam-form.firebaseio.com',
      projectId: 'jam-form',
      storageBucket: 'jam-form.appspot.com',
      messagingSenderId: '295947623681',
      appId: '1:295947623681:web:0d2314ded9b25ab832cf00',
      measurementId: 'G-M9EJ0E2L5J'
    },
    services: {
      realtimeDb: true,
      auth: {
        persistence: 'local', // default
        // it is recommended to configure either a mutation or action but you can set both
        initialize: {
          onAuthStateChangedAction: 'ON_AUTH_STATE_CHANGED_ACTION'
        },
        ssr: false // default
      },
      firestore: true,
      functions: true
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  consent: 1,
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  }
}
