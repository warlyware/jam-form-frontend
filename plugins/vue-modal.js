import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

Vue.use(VModal)

export default function (ctx, inject) {
  inject('modal', VModal)
}
